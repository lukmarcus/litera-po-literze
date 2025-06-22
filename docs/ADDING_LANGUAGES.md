# Adding New Languages

Quick guide for developers adding new languages to the application.

## Steps

### 1. Add Language Code

Add new language to `src/types/language.ts`:

```typescript
export const SUPPORTED_LANGUAGES = ["pl", "en", "test", "es"] as const;
```

### 2. Add Translations

Create new file `src/translations/es.ts`:

```typescript
export const es = {
  title: "Letra por Letra",
  subtitle: "Aprender a leer y escribir para niños",
  reportBug: "Reportar Error",
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

### 3. Create Word Pack

Create `src/data/es03Basic.ts`:

```typescript
export const ES03BASIC = [
  { word: "sol", file: "sun" },
  { word: "mar", file: "sea" },
  // ... more words
];
```

### 4. Update App Logic

Add language case in `src/app.tsx`:

```typescript
} else if (language === "es") {
  wordPacks = [
    {
      id: "es03Basic",
      name: "3 Letras Básicas",
      words: ES03BASIC,
    },
  ];
```

### 5. Add Menu Button

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

### 6. Add Assets

- Audio: `public/audio/words/es/[filename].mp3`
- Images: `public/images/words/[filename].png`

### 7. Test

Navigate to `/#es` and verify everything works.

## Notes

- Component types update automatically
- Use 2-letter language codes (ISO standard)
- Keep translations concise for UI elements
- Audio files should have clear pronunciation
