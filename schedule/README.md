# YE Construction Schedule / 日程表

Open `/schedule/` (add `?lang=en` or `?lang=zh`; the page also has a language button). Staff sign-in gate, no build step.

## Setup (once)

Run `schedule/supabase-setup.sql` in Supabase → SQL Editor. It creates `ye_sched_entries` and `ye_sched_jobs` and reuses `ye_members` / `ye_staff`.

## What it shows

- Month calendar (Monday first, NZ time). **Saturdays, Sundays and NZ public holidays are red.** Holidays are calculated in the page (Mondayised ones are labelled "observed"); Matariki uses the official table 2022–2052. Regional anniversary days are not included.
- **Confirmed quotes**: when an office account opens the page, quotes with status Signed/Paid are copied (without prices) to `ye_sched_jobs`.
  - If the quote's *Estimated Timeline* contains a date or date range (e.g. `10/11/2026 - 14/11/2026`, `3 Nov 2026`, `2026-12-01`) and optionally a time (`7:30am-4:30pm`), the job appears on those days.
  - Otherwise it is listed at the top under **To schedule**, and a worker picks the day and time with **Schedule**.
- Entries are `address · project · time` plus the work to do. Anyone can add their own; a day panel/list shows the details.

## Who sees what

- **Office (ye_members)**: every employee's entries, employee filter, can add/edit/delete for anyone (items assigned to staff show "Assigned by office").
- **Staff**: only their own entries (enforced by row-level security, not just the page). They can edit/delete only what they created. Confirmed jobs (address/project/timeline, no prices) are visible to all staff.

## Limits

- The staff job list only refreshes when an office account opens the Schedule page.
- Only dates written in the quote's timeline are recognised; free text like "2 weeks" goes to **To schedule**.
