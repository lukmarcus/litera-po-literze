# Adding Word Packs

Quick guide for developers adding new word packs to existing languages.

## Process

Simple process for adding new word packs to languages already supported.

### Steps

#### 1. Create Word Pack Data

Create new file `src/data/en02.ts` (example for English 2-letter words):

```typescript
export const EN02 = [
  { en: "ad" },
  { en: "ax" },
  { en: "go" },
  { en: "ox" },
  { en: "up" },
  // ... more words
];
```

For languages with translations, use the pattern from Polish packs:

```typescript
export const PL02 = [
  { word: "ad", file: "ad" },
  { word: "ox", file: "ox" },
  // ... more words
];
```

#### 2. Update Word Packs

Add import and word pack to existing language file `src/wordPacks/en.ts`:

```typescript
import { EN02 } from "../data/en02";
import { EN99 } from "../data/en99";

export const enWordPacks: WordPack[] = [
  {
    id: "en02",
    name: "English 2-letter words",
    type: "basic",
    words: EN02.map(({ en }) => ({ word: en })),
  },
  {
    id: "en99",
    name: "English basic pack",
    type: "basic",
    words: EN99.map(({ en }) => ({ word: en })),
  },
];
```

#### 3. Add Assets

Ensure all required assets exist:

- Audio: `public/audio/words/[language]/[filename].mp3`
- Images: `public/images/words/[filename].png`

Example for English:

- Audio: `public/audio/words/en/ad.mp3`, `public/audio/words/en/ox.mp3`
- Images: `public/images/words/ad.png`, `public/images/words/ox.png`

#### 4. Test

1. Start the development server
2. Select the language in the game menu
3. Verify the new word pack appears in the pack selection
4. Test playing the pack to ensure all words work correctly

## Best Practices

- **Naming Convention**: Use language code + number/description (e.g., `en02`, `pl03Basic`)
- **Ordering**: Place packs in difficulty order (shorter/easier words first)
- **Asset Verification**: Double-check all audio and image files exist before committing
- **Testing**: Test the entire pack thoroughly, including audio playback and image display
- **Consistency**: Follow the same data structure as existing packs for the language

## Examples

### English packs:

- `en02` - 2-letter words
- `en99` - Basic pack (mixed lengths)

### Polish packs:

- `pl03Bsc` - 3-letter basic words
- `pl03Dcr` - 3-letter diacritics words

## Notes

- Images are shared across all languages (stored in `public/images/words/`)
- Audio files are language-specific (stored in `public/audio/words/[language]/`)
- New word packs appear automatically in the game menu once added to the wordPacks array
- The `type` field can be "basic" or other values as needed for future categorization
