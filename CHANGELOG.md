# Changelog

## [0.4.3] - 2025-05-25

### Added

- Added system keyboard support for mobile devices.

### Changed

- Enhanced GitHub Actions workflows with improved error handling and deployment reliability.
- Fixed GitHub Pages base path configuration for all deployment types.

## [0.4.2] - 2025-05-21

### Changed

- Deployment to `gh-pages` from `main` branch restructured for correctness and stability.

## [0.4.1] - 2025-05-14

### Added

- Split `deploy.yml` into three separate workflows: `preview-deploy.yml`, `main-deploy.yml`, and `preview-cleanup.yml`.
- Automatic PR comment with preview URL after deployment.

### Changed

- Unified asset paths with `asset` helper.
- Improved `preview-cleanup.yml` to handle missing folders.
- Main deployment now moves built files to the root of `gh-pages`.

### Removed

- Removed old `deploy.yml`.

## [0.4.0] - 2025-05-08

### Added

- Automatic deployment to GitHub Pages on push to `main`.
- Preview environment for Pull Requests with automatic removal after merge.

### Changed

- Configured `gh-pages` branch for GitHub Pages deployment.
- Added `homepage` property to `package.json`.

## [0.3.4] - 2025-05-07

### Changed

- Refactored component structure by moving each component and its styles into dedicated folders.

## [0.3.3] - 2025-05-05

### Added

- Bug report modal accessible from the footer, offering two submission options: GitHub issue or Google Form.
- New `Footer` and `BugReportModal` components, each with dedicated CSS files.

### Changed

- Refactored `App.tsx` to delegate footer and modal logic to reusable components.

## [0.3.2] - 2025-05-02

### Added

- Footer now dynamically displays the app version from `package.json`.

### Changed

- Moved the footer from `MainMenu` to `App` to ensure it is fixed at the bottom of every page.

## [0.3.1] - 2025-04-28

### Changed

- Renamed files and folders from kebab-case to camelCase.

## [0.3.0] - 2025-04-27

### Added

- New visual main menu with navigation buttons.

### Changed

- Updated `App` header with logo and title.

## [0.2.2] - 2025-04-27

### Changed

- Enhanced the `Game` component to visually distinguish between gameplay and completion states.

## [0.2.1] - 2025-04-25

### Added

- New application icons with `manifest.webmanifest` file.

### Changed

- Prevented double game initialization on mount in React 18 dev mode (StrictMode).
- Improved `initializeGame` logic to avoid multiple calls during development.

### Removed

- Removed duplicate `getFileName` utility causing mismatched image paths for words with Polish diacritics.
- Removed `manifest.json` to avoid conflicts with `manifest.webmanifest`.

## [0.2.0] - 2025-04-20

### Changed

- Migrated the project from Craco to Vite for faster builds and improved development experience.
- Updated `package.json` scripts (`start` → `dev`, added `serve`).
- Replaced `process.env` with `import.meta.env` for environment variables.
- Renamed all files to follow `kebab-case` naming convention (e.g., `MainMenu.tsx` → `main-menu.tsx`).
- Updated Vite configuration to use ESM format to address deprecation warnings.

### Removed

- Removed Craco and its dependencies.

## [0.1.1] - 2025-04-17

### Changed

- `Game.tsx` refactored: Moved the `handleNextWord` function declaration above its usage to resolve TypeScript errors and updated dependencies in `useEffect` for compliance with ESLint rules.

## [0.1.0] - 2025-04-15

### Added

- Initial release of the application.
