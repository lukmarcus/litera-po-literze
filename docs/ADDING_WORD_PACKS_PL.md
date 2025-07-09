# Dodawanie paczek słów

Krótki przewodnik dla deweloperów, jak dodawać nowe paczki słów do już obsługiwanych języków.

## Proces

Prosty proces dodawania nowych paczek słów do istniejących języków.

### Kroki

#### 1. Utwórz plik z danymi paczki

Utwórz nowy plik, np. `src/data/pl02.ts` (przykład dla polskich wyrazów 2-literowych):

```typescript
export const PL02 = [
  { word: "ad", file: "ad" },
  { word: "ox", file: "ox" },
  // ... kolejne słowa
];
```

Dla języków bez tłumaczeń, stosuj prostszy format (patrz angielskie paczki):

```typescript
export const EN02 = [
  { en: "ad" },
  { en: "ox" },
  // ... kolejne słowa
];
```

#### 2. Zaktualizuj plik z paczkami języka

Dodaj import i nową paczkę do pliku, np. `src/wordPacks/pl.ts`:

```typescript
import { PL02 } from "../data/pl02";
import { PL03Bsc } from "../data/pl03Bsc";

export const plWordPacks: WordPack[] = [
  {
    id: "pl02",
    name: "Polskie wyrazy 2-literowe",
    type: "basic",
    words: PL02,
  },
  {
    id: "pl03Bsc",
    name: "Polskie wyrazy 3-literowe (podstawowe)",
    type: "basic",
    words: PL03Bsc,
  },
];
```

#### 3. Dodaj zasoby

Upewnij się, że wszystkie wymagane pliki istnieją:

- Audio: `public/audio/words/pl/[nazwa_pliku].mp3`
- Obrazki: `public/images/words/[nazwa_pliku].png`

Przykład:

- Audio: `public/audio/words/pl/ad.mp3`, `public/audio/words/pl/ox.mp3`
- Obrazki: `public/images/words/ad.png`, `public/images/words/ox.png`

#### 4. Przetestuj

1. Uruchom serwer deweloperski
2. Wybierz język w menu gry
3. Sprawdź, czy nowa paczka pojawia się na liście
4. Przetestuj rozgrywkę z nową paczką (audio, obrazki)

## Dobre praktyki

- **Nazewnictwo**: używaj kodu języka + numer/opis (np. `pl02`, `pl03Bsc`)
- **Kolejność**: umieszczaj paczki w kolejności trudności (krótsze/łatwiejsze słowa na początku)
- **Weryfikacja zasobów**: sprawdź, czy wszystkie pliki audio i obrazki istnieją przed commitem
- **Testowanie**: dokładnie przetestuj całą paczkę (audio, obrazki, wyświetlanie)
- **Spójność**: stosuj tę samą strukturę danych co w istniejących paczkach dla danego języka

## Przykłady

### Polskie paczki:

- `pl02` – wyrazy 2-literowe
- `pl03Bsc` – wyrazy 3-literowe (podstawowe)
- `pl03Dcr` – wyrazy 3-literowe z polskimi znakami

### Angielskie paczki:

- `en02` – 2-letter words
- `en99` – Basic pack (mixed lengths)

## Uwagi

- Obrazki są współdzielone między językami (w `public/images/words/`)
- Pliki audio są specyficzne dla języka (w `public/audio/words/[język]/`)
- Nowe paczki pojawiają się automatycznie w menu gry po dodaniu do tablicy wordPacks
- Pole `type` może przyjmować wartość "basic" lub inne, jeśli w przyszłości pojawią się nowe kategorie
