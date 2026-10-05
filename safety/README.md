# YE Construction JSA / TA

Open `/safety/` (add `?lang=zh` or `?lang=en` to choose the language). Uses the company logo and the staff sign-in gate. No build step.

## Setup (once)

Run `safety/supabase-setup.sql` in Supabase → SQL Editor. It creates `ye_jsa_records` and `ye_jsa_signatures` and reuses the existing `ye_members` / `ye_staff` lists.

## Use

1. Open **JSA / TA records**, then **New JSA / TA** (or open an existing site record). Everything is saved to the company server automatically and follows you to other devices.
2. Enter project, scope and emergency information. Select the actual work groups, adapt steps, hazards and controls to the site, and add extra steps as required. Site edits appear verbatim in both languages, so use bilingual text or an interpreter.
3. Complete owners and initial/residual scores using the labelled example matrix (not an official Site Safe matrix). High/critical residual risk blocks signing.
4. Confirm the site briefing and responsible person review.
5. Each worker opens the same record on their own phone, enters their details, taps **Tap here to sign**, signs, taps **Done**, then **Confirm & save signature**.
6. Export the record and print/save PDF in each language for filing.

## Who can do what

- Any staff or office account can open every record and add their own signature.
- Only the person who created a record, or an office account, can edit or delete it.
- When anyone has signed, the content is locked on the server. **New revision** keeps the analysis, clears the briefing confirmations and starts a fresh signature list; earlier signatures stay as history, and the signed revision is downloaded first.
- A record with signatures cannot be deleted by its creator; signatures cannot be edited, and only office accounts can delete one.

## Limits

- Signatures are drawn acknowledgements, not certified digital signatures. Reviewer name and checkboxes record a declaration, not independently verified approval.
- If two people edit the same unsigned record at once, the last save wins.
- JSON exports include both declarations, resolved Chinese/English analysis, risk ratings, signatures and version. There is no JSON import.
- This is a planning template, not an approved site assessment, legal certification or substitute for permits/licences. Separate assessment is needed for uncovered high-risk work.
