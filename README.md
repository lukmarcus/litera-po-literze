# Litera po Literze

Litera po Literze ("Letter by Letter") is an educational web application designed to help children learn reading and writing. The application provides an interactive and engaging way for children to practice their language skills through word recognition and typing exercises.

## Features

- **Multiple languages**: Polish, English, and test mode with hash-based routing (`/#pl`, `/#en`, `/#test`)
- **Interactive word learning interface** with visual and audio feedback
- **Audio pronunciation** for each word
- **Visual representation** of words with images
- **Success and error sound effects**
- **Responsive design** for various devices
- **Mobile-friendly**: system keyboard support on mobile devices
- **Direct URL access** to specific languages for easy sharing

## Language Support

The app supports multiple languages with direct URL access:

- **Polish**: `/#pl` - 58 words (32 basic + 26 with diacritics)
- **English**: `/#en` - 58 words (basic vocabulary)
- **Test mode**: `/#test` - 6 words (for testing)

You can also switch languages using the "Change language" button in the main menu.

**Note**: Audio pronunciation is in Polish for all modes.

For developers wanting to add new languages, see [Adding Languages Guide](docs/ADDING_LANGUAGES.md).

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
- Words: [TTSMaker](https://ttsmaker.com/)
- Sounds: [Pixabay](https://pixabay.com/)
