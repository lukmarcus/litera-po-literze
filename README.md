# Litera po Literze 🔤

### _Letter by Letter - Educational Language Learning Game_

**Litera po Literze** ("Letter by Letter") is a multilingual educational web application designed to help children learn reading and writing. The application provides an interactive and engaging way for children to practice their language skills through word recognition and typing exercises.

## Features

**Multiple languages**: Polish, English, and test mode with hash-based routing (`/#pl-en`, `/#en-pl`, etc.)

- **Interactive word learning interface** with visual and audio feedback
- **Audio pronunciation** for each word
- **Visual representation** of words with images
- **Success and error sound effects**
- **Responsive design** for various devices
- **Mobile-friendly**: system keyboard support on mobile devices
- **Direct URL access** to any app/pack language combination for easy sharing (e.g. `/#pl-en`)

## Language & Pack Selection

You can now select the app language and word pack language independently. The URL hash reflects both settings. Example combinations:

- `/#pl-en` – Polish UI, English word packs
- `/#en-pl` – English UI, Polish word packs
- ... (any combination, e.g. `/#en-en`, `/#pl-testpack`)

You can switch both languages using the main menu. The URL updates automatically, so you can share direct links to any configuration.

**Note**: Audio pronunciation matches the selected word pack language.

For developers wanting to add new languages or word packs, see [Adding Languages Guide](docs/ADDING_LANGUAGES.md) and [Adding Word Packs Guide](docs/ADDING_WORD_PACKS.md).

## Prerequisites

Before starting, make sure you have:

- **Node.js** (version 18.x recommended; minimum 14)
- **npm** (version 9.x recommended; minimum 6)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/lukmarcus/litera-po-literze.git
   cd litera-po-literze
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will open in your default browser at `http://localhost:5173`.

## Available Scripts

- `npm run dev` – Runs the app in development mode (with hot reload)
- `npm run build` – Builds the app for production (output in `dist/`)
- `npm run serve` – Serves the production build locally for testing

## Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build:

```bash
npm run serve
```

The application will be served locally for testing.

## Deployment

The application uses GitHub Actions for automatic deployment to GitHub Pages:

- Main branch is deployed to the root path (`/litera-po-literze/`)
- Pull Request previews are deployed to their own subfolders (`/litera-po-literze/pr-XX/`)
- Preview deployments are automatically cleaned up when PRs are closed

Note: When multiple deployments are triggered simultaneously, GitHub may show cancellation messages for lower-priority deployments. This is normal behavior that ensures deployment consistency and can be safely ignored.

## Changelog

For a detailed list of changes, see the [Changelog](./CHANGELOG.md).

## Credits

- Main author (behind the AI): [Marek Szumny](https://github.com/lukmarcus)
- Images: [ChatGPT](https://chatgpt.com/)
- Resize & Compress: [iLoveIMG](https://www.iloveimg.com/)
- Audio Words: [TTSMaker](https://ttsmaker.com/)
- Sounds: [Pixabay](https://pixabay.com/)
- Language flags: [Wiktionary](https://en.wiktionary.org/wiki/Wiktionary:Language_flags_list)
