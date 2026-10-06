# YE Construction Schedule / 日程表

Open `/schedule/` (add `?lang=en` or `?lang=zh`; the page also has a language button). Staff sign-in gate, no build step.

## Setup (once)

Run `schedule/supabase-setup.sql` in Supabase → SQL Editor. It creates `ye_sched_entries` and `ye_sched_jobs` and reuses `ye_members` / `ye_staff`.

## What it shows

- Month calendar (Monday first, NZ time). **Saturdays, Sundays and NZ public holidays are red.** Holidays are calculated in the page (Mondayised ones are labelled "observed"); Matariki uses the official table 2022–2052. Choose your **Region** to add its anniversary day (Auckland by default; remembered per device).
- **Confirmed quotes** (status Signed or Paid) are pushed to workers:
  1. In the Business System mark the quote Signed/Paid. A window opens to **pick the workers** (also the 👷 button on the Projects list).
  2. The job is copied (no prices) to `ye_sched_jobs` with those workers. Only they, and office accounts, can see it.
  3. If the quote's *Estimated Timeline* contains a date or range (e.g. `10/11/2026 - 14/11/2026`, `3 Nov 2026`, `2026-12-01`) and optionally a time (`7:30am-4:30pm`), the job appears on those days. Otherwise it is listed at the top under **To schedule** and the worker picks the day and time.
- Entries are `address · project · time` plus the work to do. Anyone can add their own.
- The Schedule page, when opened by an office account, also reconciles `ye_sched_jobs` with all Signed/Paid quotes.

## Who sees what

- **Office (ye_members)**: every employee's entries, employee filter, can add/edit/delete for anyone, sees which workers a job is assigned to.
- **Staff**: only their own entries and only the jobs they were assigned (enforced by row-level security).

## Limits

- Dates are only recognised when written in the quote's timeline; free text like "2 weeks" goes to **To schedule**.
- Regions not in the list (Waikato, Bay of Plenty, …) have no local anniversary day; pick "Other region".
