# Litera po Literze

> **Note:** Currently, the application is available only in Polish. English version might be added in the future.

Litera po Literze ("Letter by Letter") is an educational web application designed to help children learn reading and writing in Polish. The application provides an interactive and engaging way for children to practice their language skills through word recognition and typing exercises.

## Features

- Interactive word learning interface
- Audio pronunciation for each word
- Visual representation of words
- Success and error sound effects
- Responsive design for various devices
- Mobile-friendly: system keyboard support on mobile devices

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
