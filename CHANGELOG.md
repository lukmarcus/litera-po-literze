# Changelog

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
