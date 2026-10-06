-- Schedule / 日程表: tables for the work calendar.
-- Run once in Supabase -> SQL Editor (same project as Timesheet, QA and JSA/TA).
-- Reuses the existing ye_members (office/managers) and ye_staff (staff list) tables.
--
-- Who can do what
--   * ye_sched_entries (the calendar items): office/manager accounts see and edit everyone's.
--     A staff account sees only the rows whose owner_email is their own email, and can add /
--     edit / delete only the rows they created themselves (items the office assigned to them
--     are read-only for them).
--   * ye_sched_jobs (confirmed quotes, NO prices): written only by office accounts. The Business
--     System fills it when a quote is marked Signed/Paid and workers are picked; the Schedule page
--     also reconciles it when an office account opens it. A staff account can read only the jobs
--     that list them as a worker.

create or replace function public.ye_sched_is_manager() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.ye_members m where lower(m.email) = lower(auth.jwt() ->> 'email'));
$$;

create or replace function public.ye_sched_is_staff() returns boolean
  language sql stable security definer set search_path = public as $$
  select public.ye_sched_is_manager()
      or exists (select 1 from public.ye_staff s where lower(s.email) = lower(auth.jwt() ->> 'email'));
$$;

create table if not exists public.ye_sched_entries (
  id          uuid primary key default gen_random_uuid(),
  owner_email text not null,
  owner_name  text not null default '',
  created_by  text not null default (auth.jwt() ->> 'email'),
  work_date   date not null,
  end_date    date not null,
  start_time  text not null default '',
  end_time    text not null default '',
  address     text not null default '',
  project     text not null default '',
  work        text not null default '',
  job_id      text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  check (end_date >= work_date)
);
-- where an entry came from: manual, import or timesheet (the Timesheet adds each shift here)
alter table public.ye_sched_entries add column if not exists source text not null default 'manual';
alter table public.ye_sched_entries add column if not exists ts_id  text;
create index if not exists ye_sched_entries_ts_idx on public.ye_sched_entries(ts_id);
create index if not exists ye_sched_entries_date_idx  on public.ye_sched_entries(work_date, end_date);
create index if not exists ye_sched_entries_owner_idx on public.ye_sched_entries(lower(owner_email));

create or replace function public.ye_sched_touch() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  if tg_op = 'UPDATE' then new.created_by := old.created_by; new.created_at := old.created_at; end if;
  return new;
end $$;
drop trigger if exists ye_sched_touch on public.ye_sched_entries;
create trigger ye_sched_touch before insert or update on public.ye_sched_entries
  for each row execute function public.ye_sched_touch();

alter table public.ye_sched_entries enable row level security;
drop policy if exists "sched manager all" on public.ye_sched_entries;
drop policy if exists "sched own read"    on public.ye_sched_entries;
drop policy if exists "sched own insert"  on public.ye_sched_entries;
drop policy if exists "sched own update"  on public.ye_sched_entries;
drop policy if exists "sched own delete"  on public.ye_sched_entries;

create policy "sched manager all" on public.ye_sched_entries for all
  using (public.ye_sched_is_manager()) with check (public.ye_sched_is_manager());
create policy "sched own read" on public.ye_sched_entries for select
  using (public.ye_sched_is_staff() and lower(owner_email) = lower(auth.jwt() ->> 'email'));
create policy "sched own insert" on public.ye_sched_entries for insert
  with check (public.ye_sched_is_staff()
          and lower(owner_email) = lower(auth.jwt() ->> 'email')
          and lower(created_by)  = lower(auth.jwt() ->> 'email'));
create policy "sched own update" on public.ye_sched_entries for update
  using (lower(owner_email) = lower(auth.jwt() ->> 'email') and lower(created_by) = lower(auth.jwt() ->> 'email'))
  with check (lower(owner_email) = lower(auth.jwt() ->> 'email') and lower(created_by) = lower(auth.jwt() ->> 'email'));
create policy "sched own delete" on public.ye_sched_entries for delete
  using (lower(owner_email) = lower(auth.jwt() ->> 'email') and lower(created_by) = lower(auth.jwt() ->> 'email'));

create table if not exists public.ye_sched_jobs (
  job_id      text primary key,
  doc_no      text not null default '',
  client      text not null default '',
  project     text not null default '',
  address     text not null default '',
  timeline    text not null default '',
  start_date  date,
  end_date    date,
  start_time  text not null default '',
  end_time    text not null default '',
  casuals     text[] not null default '{}',   -- casual workers (names only, not on the staff list)
  assignees   text[] not null default '{}',   -- lower-case emails of the workers picked in the quote
  status      text not null default '',
  synced_at   timestamptz not null default now()
);

-- in case an earlier version of this table already exists
alter table public.ye_sched_jobs add column if not exists assignees text[] not null default '{}';
alter table public.ye_sched_jobs add column if not exists casuals   text[] not null default '{}';

alter table public.ye_sched_jobs enable row level security;
drop policy if exists "sched jobs manager all" on public.ye_sched_jobs;
drop policy if exists "sched jobs staff read"  on public.ye_sched_jobs;
create policy "sched jobs manager all" on public.ye_sched_jobs for all
  using (public.ye_sched_is_manager()) with check (public.ye_sched_is_manager());
-- staff see only the jobs whose quote lists them as a worker
create policy "sched jobs staff read" on public.ye_sched_jobs for select
  using (public.ye_sched_is_staff()
     and exists (select 1 from unnest(assignees) a where lower(a) = lower(auth.jwt() ->> 'email')));
