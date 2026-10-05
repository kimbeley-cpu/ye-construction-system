-- QA Inspection: table for the QA sheets.
-- Run once in Supabase → SQL Editor (same project as the timesheet).
-- It reuses the existing ye_members (managers) and ye_staff (staff list) tables.

create table if not exists public.ye_qa_sheets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid() references auth.users(id) on delete cascade,
  email         text not null default (auth.jwt() ->> 'email'),
  site          text,
  floor         text,
  room          text,
  technician    text,
  inspect_date  date,
  template      text,
  done          int  default 0,
  total         int  default 0,
  fails         int  default 0,
  status        text not null default 'draft' check (status in ('draft','submitted','returned','approved')),
  data          jsonb,
  submitted_at  timestamptz,
  approved_by   text,
  approved_at   timestamptz,
  manager_note  text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists ye_qa_sheets_user_idx on public.ye_qa_sheets(user_id);
create index if not exists ye_qa_sheets_room_idx on public.ye_qa_sheets(site, floor, room);

-- keep updated_at / submitted_at right
create or replace function public.ye_qa_touch() returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  if new.status = 'submitted' and (tg_op = 'INSERT' or old.status is distinct from 'submitted') then
    new.submitted_at := now();
  end if;
  return new;
end $$;
drop trigger if exists ye_qa_touch on public.ye_qa_sheets;
create trigger ye_qa_touch before insert or update on public.ye_qa_sheets
  for each row execute function public.ye_qa_touch();

-- is the signed-in user a manager? (ye_members holds the manager emails)
create or replace function public.ye_qa_is_manager() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.ye_members m where lower(m.email) = lower(auth.jwt() ->> 'email'));
$$;

alter table public.ye_qa_sheets enable row level security;

drop policy if exists "qa manager all"   on public.ye_qa_sheets;
drop policy if exists "qa own read"      on public.ye_qa_sheets;
drop policy if exists "qa own insert"    on public.ye_qa_sheets;
drop policy if exists "qa own update"    on public.ye_qa_sheets;
drop policy if exists "qa own delete"    on public.ye_qa_sheets;

-- managers: everything
create policy "qa manager all" on public.ye_qa_sheets for all
  using (public.ye_qa_is_manager()) with check (public.ye_qa_is_manager());

-- staff: their own sheets only
create policy "qa own read" on public.ye_qa_sheets for select
  using (user_id = auth.uid());
create policy "qa own insert" on public.ye_qa_sheets for insert
  with check (user_id = auth.uid() and status in ('draft','submitted'));
-- staff can edit only drafts / returned sheets, and can only move them to draft or submitted
create policy "qa own update" on public.ye_qa_sheets for update
  using (user_id = auth.uid() and status in ('draft','returned'))
  with check (user_id = auth.uid() and status in ('draft','submitted'));
create policy "qa own delete" on public.ye_qa_sheets for delete
  using (user_id = auth.uid() and status in ('draft','returned'));
