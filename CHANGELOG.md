# Changelog

## [0.6.5] - 2025-07-15

### Changed

- App language and word pack language can now be selected independently with dedicated menu for pack language.
- Audio and pack filtering now always use the selected pack language.
- Removed all remnants of the "test" app language.

## [0.6.4] - 2025-07-11

### Added

- Added documentation (PL/EN) for adding word packs, including image requirements.

## [0.6.3] - 2025-07-07

### Added

- Added new English word pack `en02` (2-letter words: ad, ax, go, id, no, ok, on, ox, tv, up) with dedicated audio and images for each word.

## [0.6.2] - 2025-07-01

### Added

- Added English audio files for all words in the EN99 pack.

## [0.6.1] - 2025-06-28

### Changed

- Fixed audio paths to use correct language folders instead of always using Polish audio files.
- Updated 4 English word names for better consistency.

## [0.6.0] - 2025-06-25

### Added

- Language switcher in the main menu (PL, EN, Test) with a dedicated submenu.
- Hash-based language routing with direct URL access to specific languages (e.g., `/#pl`, `/#en`, `/#test`).
- Full internationalization (i18n) support for all UI components.
- Centralized language type system in `src/types/language.ts` for maintainability and easy language additions.
- Complete English word pack (EN99) with 58 words matching the Polish vocabulary.
- Developer guide for adding new languages (`docs/ADDING_LANGUAGES.md`).
- Modular translation system with separate files per language (`src/translations/`).
- Modular word pack system with centralized management (`src/wordPacks/`).
- PackType categorization ("basic" | "diacritics" | "test") for word packs.

### Changed

- Unified word image/audio file naming (English).
- Moved all component props interfaces into dedicated `types.ts` files within each component folder.
- Refactored translation architecture from single large file to modular per-language files.
- Restructured word pack management from hardcoded app.tsx logic to configurable modular system.
- Enhanced word pack format with PackType categorization for better organization.

## [0.5.2] - 2025-06-21

### Changed

- Refactored Game component logic for random mode: simplified word selection, state management, and audio handling.
- Improved word image rendering and removed unnecessary attributes from the hidden input.

## [0.5.1] - 2025-06-14

### Added

- Added the ability to return to the main menu during a game, with a confirmation modal to prevent accidental loss of progress.

### Fixed

- Fixed main menu layout: removed vertical scrolling and white borders.

## [0.5.0] - 2025-06-08

### Added

- Game modes: new main menu with selection between "Levels" and "Random" (word packs) modes.
- Ability to select multiple word packs for random mode, with merged gameplay pool.
- Test word packs: PL01ASD (a, s, d) and PL01QWE (q, w, e) for development/testing.
- End-of-game modal with options to replay the same packs, change packs (returns to pack selection with previous selection), or return to menu after finishing all words.

### Changed

- Refactored Game and MainMenu components to support dynamic word packs and improved UI/UX.
- WordPack type: removed the description field.
- All code and UI references updated to use new test pack names and structure.
- Communication between Game and App now uses React callback props instead of CustomEvent for changing packs (more idiomatic React).

## [0.4.4] - 2025-05-31

### Changed

- Unified Nunito font usage across all platforms for consistent typography.
- Improved header layout for better vertical balance above and below the logo.

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
