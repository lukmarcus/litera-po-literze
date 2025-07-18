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

### 3. Add Menu Button

Add button in `src/components/mainMenu/mainMenu.tsx` language view section:

```typescript
<button
  className={`menu-button${language === "es" ? " lang-active" : ""}`}
  onClick={() => {
    setLanguage("es");
    setView("main");
  }}
>
  ES
</button>
```

> **Note**: Menu translations are now automatically included from the main translation files - no need to add them separately!

### 4. Add Word Packs

See [ADDING_WORD_PACKS.md](./ADDING_WORD_PACKS.md) for instructions on adding word packs, assets, and testing.

## Notes

- Use 2-letter language codes (ISO standard)
- Keep translations concise for UI elements
- Component types update automatically
