# Chuck Norris Jokes App

A React application that displays random Chuck Norris jokes with category filtering, favorites, and name replacement features.

## Features

- 🎭 Random Chuck Norris jokes from the [Chuck Norris API](https://api.chucknorris.io)
- 🏷️ Category filtering (explicit content filtered out)
- ❤️ Like/favorite jokes with local storage persistence
- 🔄 Infinite scroll with "Load More" button
- ✏️ Replace "Chuck Norris" with custom names
- 📋 Copy jokes to clipboard
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎨 Material-UI components

## Tech Stack

- React 17.0.2
- Material-UI 4.12.4
- Chuck Norris API
- Local Storage for persistence

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/PetitKwoba/chunknorrisassesment.git
cd chunknorrisassesment
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

This app is optimized for Vercel deployment:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Vercel will automatically detect it's a Create React App
5. Click "Deploy"

The `vercel.json` configuration file handles:
- SPA routing (all routes serve index.html)
- CORS headers for API calls

### GitHub Pages

```bash
npm run deploy
```

## Available Scripts

### `npm start`

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

### `npm run deploy`

Deploys the app to GitHub Pages

## API Configuration

The app automatically switches between:
- **Development**: Uses CRA proxy (`proxy` in package.json)
- **Production**: Direct API calls to `https://api.chucknorris.io`

No additional configuration needed!

## Developer

Developed by [Emmanuel P. Kwoba](https://petitportfolio.netlify.app/)  
GitHub: [PetitKwoba](https://github.com/PetitKwoba)

## License

This project is open source and available under the MIT License.

---

## Troubleshooting

### White page on deployment?

Make sure:
1. The `homepage` field is removed from `package.json` (for Vercel)
2. Or set correctly for GitHub Pages: `"homepage": "https://yourusername.github.io/repo-name/"`
3. The `vercel.json` file exists in the root directory
4. Environment variables are set if needed

### API not working?

The Chuck Norris API (`https://api.chucknorris.io`) should work without authentication. If you see CORS errors, the `vercel.json` configuration handles this in production.

## Learn More

- [Chuck Norris API Documentation](https://api.chucknorris.io/)
- [Material-UI Documentation](https://v4.mui.com/)
- [Create React App Documentation](https://create-react-app.dev/)
- [React Documentation](https://reactjs.org/)
