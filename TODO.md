# Header Logo Task — TODO

## Goal
Remove the "MAOSS · Aley" text from the header brand on all pages, leaving only the circular logo, and enlarge ONLY the header logo (footer stays at 40px with text).

## Steps
- [x] 1. Read remaining HTML files to confirm header markup (academic, contact, news, parent, services, staff, students)
- [x] 2. Edit header brand in all 10 HTML files: remove text, keep only logo image
- [x] 3. Update styles.css: add scoped rule for larger header logo
- [x] 4. Update styles-1.css: add scoped rule for larger header logo
- [x] 5. Verify footer logo + text remains unchanged

## Status: COMPLETE

All 10 pages (index, about, academic, admission, contact, news, parent, services, staff, students) now show only the circular logo in the header with no text. The header logo is enlarged to 56px via the scoped `.site-header .brand img` rule in both styles.css and styles-1.css. The footer logo remains at 40px with its "MAOSS · Aley" text intact.
