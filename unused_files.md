# Unused Files Report

The following files appear to be unused in the codebase based on a search for their filenames:

## Public Directory (`public/`)
- `rca.png`
- `623_1x_shots_so.png`
- `279_1x_shots_so.png`
- `139_1x_shots_so.png`

## Screenshots Directory (`public/screenshots/`)
- `dashboard-light.png` (Replaced by `hero-light.png` and `actions-light.png`)
- `dashboard-dark.png` (Replaced by `hero-dark.png` and `actions-dark.png`)

These files can be safely deleted if you are sure they are not referenced dynamically in a way that static analysis missed (though `grep` confirmed no direct string matches).
