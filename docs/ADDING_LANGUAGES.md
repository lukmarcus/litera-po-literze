# Adding New Languages

Quick guide for developers adding new languages to the application.

## Steps

### 1. Add Language Code

Add new language to `src/types/language.ts`:

```typescript
export const SUPPORTED_LANGUAGES = ["pl", "en", "test", "es"] as const;
```

### 2. Add Translations

Create new file `src/translations/es.ts` and add your translations:

```typescript
export const es = {
  title: "Letra por Letra",
  subtitle: "Aprender a leer y escribir para niños",
  // ... all other translation keys
} as const;
```

Then add import to `src/translations/index.ts`:

```typescript
import { es } from "./es";

export const translations = {
  pl,
  en,
  test,
  es,
} as const;
```

### 3. Add Language Flag

Add a flag SVG for the new language in `public/images/languages/` (e.g. `es.svg`).
You can find language SVG flags here: https://en.wiktionary.org/wiki/Wiktionary:Language_flags_list

### 4. Language Menu Button

You do not need to manually add a button for the new language in the menu. The language selection menu is now generated automatically from the supported languages and flag assets in `LanguageMenuSection.tsx`.

> **Note**: Menu translations are also included automatically from the main translation files.

### 5. Add Word Packs

See [ADDING_WORD_PACKS.md](./ADDING_WORD_PACKS.md) for instructions on adding word packs, assets, and testing.

## Notes

- Use 2-letter language codes (ISO standard)
- Keep translations concise for UI elements
- Component types update automatically
