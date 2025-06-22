# Adding New Languages

Quick guide for developers adding new languages to the application.

## Steps

### 1. Add Language Code

Add new language to `src/types/language.ts`:

```typescript
export const SUPPORTED_LANGUAGES = ["pl", "en", "test", "de"] as const;
```

### 2. Add Translations

Add translation object to `src/translations/index.ts`:

```typescript
de: {
  title: "Buchstabe für Buchstabe",
  subtitle: "Lesen und Schreiben lernen für Kinder",
  reportBug: "Fehler melden",
  // ... all other translation keys
},
```

### 3. Create Word Pack

Create `src/data/de03Basic.ts`:

```typescript
export const DE03BASIC = [
  { word: "der", file: "the-masculine" },
  { word: "die", file: "the-feminine" },
  // ... more words
];
```

### 4. Update App Logic

Add language case in `src/app.tsx`:

```typescript
} else if (language === "de") {
  wordPacks = [
    {
      id: "de03Basic",
      name: "3 Buchstaben Grundwortschatz",
      words: DE03BASIC,
    },
  ];
```

### 5. Add Menu Button

Add button in `src/components/mainMenu/mainMenu.tsx`:

```typescript
// Add to TRANSLATIONS object
de: {
  levels: "Stufen",
  packs: "Pakete",
  // ... other menu translations
}

// Add button in language view
<button onClick={() => setLanguage("de")}>
  DE
</button>
```

### 6. Add Assets

- Audio: `public/audio/words/de/[filename].mp3`
- Images: `public/images/words/[filename].png`

### 7. Test

Navigate to `/#de` and verify everything works.

## Notes

- Component types update automatically
- Use 2-letter language codes (ISO standard)
- Keep translations concise for UI elements
- Audio files should have clear pronunciation
