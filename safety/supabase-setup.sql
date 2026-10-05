-- JSA / TA Safety: shared records and worker signatures.
-- Run once in Supabase -> SQL Editor (same project as the Timesheet and QA).
-- Uses the existing ye_members (office/managers) and ye_staff (staff list) tables.
--
-- Who can do what
--   * Any staff or office account can read every JSA/TA record and add their own signature to it.
--   * Only the person who created a record (or an office/manager account) can edit or delete it.
--   * Once anyone has signed the current revision, its content is locked on the server.
--     Create a new revision to change it; earlier signatures are kept as history.
--   * Signatures cannot be edited. Only office/manager accounts can delete one.

create table if not exists public.ye_jsa_records (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid default auth.uid() references auth.users(id) on delete set null,
  email       text not null default (auth.jwt() ->> 'email'),
  project     text not null default '',
  address     text not null default '',
  revision    int  not null default 1 check (revision >= 1),
  data        jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists ye_jsa_records_updated_idx on public.ye_jsa_records(updated_at desc);

create table if not exists public.ye_jsa_signatures (
  id           uuid primary key default gen_random_uuid(),
  record_id    uuid not null references public.ye_jsa_records(id) on delete cascade,
  revision     int  not null,
  user_id      uuid default auth.uid() references auth.users(id) on delete set null,
  email        text not null default (auth.jwt() ->> 'email'),
  name         text not null check (length(trim(name)) > 0),
  role         text not null check (length(trim(role)) > 0),
  licence      text not null default '',
  language     text not null default '',
  declaration  text not null default '',
  signature    text not null check (signature like 'data:image/png;base64,%' and length(signature) < 600000),
  signed_at    timestamptz not null default now()
);
create index if not exists ye_jsa_signatures_record_idx on public.ye_jsa_signatures(record_id, revision);

-- helpers ---------------------------------------------------------------
create or replace function public.ye_jsa_is_manager() returns boolean
  language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.ye_members m where lower(m.email) = lower(auth.jwt() ->> 'email'));
$$;

create or replace function public.ye_jsa_is_staff() returns boolean
  language sql stable security definer set search_path = public as $$
  select public.ye_jsa_is_manager()
      or exists (select 1 from public.ye_staff s where lower(s.email) = lower(auth.jwt() ->> 'email'));
$$;

-- keep updated_at right, keep the owner fixed, and lock a record that has signatures
create or replace function public.ye_jsa_guard() returns trigger
  language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  new.user_id    := old.user_id;
  new.email      := old.email;
  new.created_at := old.created_at;
  if new.revision < old.revision then
    raise exception 'A revision number cannot go backwards.';
  end if;
  if new.revision = old.revision
     and exists (select 1 from public.ye_jsa_signatures s where s.record_id = old.id and s.revision = old.revision)
     and (new.data is distinct from old.data
          or new.project is distinct from old.project
          or new.address is distinct from old.address) then
    raise exception 'This JSA/TA already has signatures. Create a new revision to change it.';
  end if;
  return new;
end $$;
drop trigger if exists ye_jsa_guard on public.ye_jsa_records;
create trigger ye_jsa_guard before update on public.ye_jsa_records
  for each row execute function public.ye_jsa_guard();

-- row level security ------------------------------------------------------
alter table public.ye_jsa_records    enable row level security;
alter table public.ye_jsa_signatures enable row level security;

drop policy if exists "jsa rec read"   on public.ye_jsa_records;
drop policy if exists "jsa rec insert" on public.ye_jsa_records;
drop policy if exists "jsa rec update" on public.ye_jsa_records;
drop policy if exists "jsa rec delete" on public.ye_jsa_records;
create policy "jsa rec read"   on public.ye_jsa_records for select
  using (public.ye_jsa_is_staff());
create policy "jsa rec insert" on public.ye_jsa_records for insert
  with check (public.ye_jsa_is_staff() and user_id = auth.uid());
create policy "jsa rec update" on public.ye_jsa_records for update
  using (public.ye_jsa_is_manager() or user_id = auth.uid())
  with check (public.ye_jsa_is_manager() or user_id = auth.uid());
create policy "jsa rec delete" on public.ye_jsa_records for delete
  using (public.ye_jsa_is_manager()
         or (user_id = auth.uid()
             and not exists (select 1 from public.ye_jsa_signatures s where s.record_id = ye_jsa_records.id)));

drop policy if exists "jsa sig read"   on public.ye_jsa_signatures;
drop policy if exists "jsa sig insert" on public.ye_jsa_signatures;
drop policy if exists "jsa sig delete" on public.ye_jsa_signatures;
create policy "jsa sig read"   on public.ye_jsa_signatures for select
  using (public.ye_jsa_is_staff());
-- a signature can only be added to the current revision of an existing record, as yourself
create policy "jsa sig insert" on public.ye_jsa_signatures for insert
  with check (public.ye_jsa_is_staff()
              and user_id = auth.uid()
              and exists (select 1 from public.ye_jsa_records r
                          where r.id = ye_jsa_signatures.record_id and r.revision = ye_jsa_signatures.revision));
create policy "jsa sig delete" on public.ye_jsa_signatures for delete
  using (public.ye_jsa_is_manager());

grant select, insert, update, delete on public.ye_jsa_records    to authenticated;
grant select, insert, delete          on public.ye_jsa_signatures to authenticated;
