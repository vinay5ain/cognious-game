# Cognieos Demo (cognious-game)

A client-side interactive gaming demo built with React and Vite — three single-player mini-games plus a local wallet/profile system that persists data in the browser (Local Storage). Intended as a demonstration of frontend application design, state management and UI implementation.

## Overview
- Problem it solves: provides an example of a small interactive game platform that demonstrates UI design, state & persistence patterns, and simple game logic without requiring a backend.
- Why it was built: to showcase frontend development capabilities (component design, state handling, routing, styling) and to be a learning/project sample.
- What the application does: users can sign in with a username, play three demo games, earn/spend demo coins, view transaction history, claim a daily reward, and track per-game statistics.
- Who can use it: developers, recruiters, or interviewers looking for a frontend project demonstrating React, client-side persistence and component-based architecture.

## Key features (implemented)
- Lucky Wheel — spin to receive a random coin reward.
- Guess The Number — guess 1–10 to win/lose demo coins.
- Memory Match — card-pair memory game with best-time tracking.
- Wallet system with starting balance, transactions and balance updates.
- Daily reward with 24-hour cooldown.
- Player profile with per-game statistics (played, wins, best time).
- Local Storage persistence for user, wallet, transactions and stats.
- React Context API for global state; React Router for navigation.
- Responsive layouts and separate components for UI pieces.

## Tech stack
- Frontend
  - JavaScript (ESM)
  - React (package.json lists react 18)
  - react-router-dom (routing)
  - Vite (development + build)
- Styling
  - Plain CSS files (component/page styles under src/)
- Tools
  - npm (scripts in package.json: dev, build, preview)

## How it works (runtime flow)
- main.jsx mounts the React app and the router.
- App.jsx defines routes (Home, Login, GameLobby, Profile, game pages).
- src/context/GameContext.jsx provides global state (user, wallet, transactions, gameStats, daily reward) and exposes actions:
  - loginUser(username), addTransaction(amount, description), claimDailyReward(), updateGameStats(), resetProgress().
- Each game page uses the exposed context API to update wallet/statistics and create transactions that are persisted to Local Storage.
- All data (user, wallet, transactions, gameStats, lastDailyReward) is loaded from Local Storage on mount and saved after updates.

## Architecture (single-page app)
- Single-page React application (client-only).
- State boundary: GameContext (global) for cross-page state; components use the useGame hook / context to interact.
- UI: pages (src/pages) render game UI and reusable components (src/components).
- Persistence: Local Storage keys used:
  - cognieos_user
  - cognieos_wallet
  - cognieos_transactions
  - cognieos_gameStats
  - cognieos_lastDailyReward

## Project structure (important files)
```
src/
  App.jsx                   # Routing and top-level layout
  main.jsx                  # App bootstrap
  index.css, App.css        # Global styles
  context/
    GameContext.jsx         # Global state + localStorage logic
  pages/
    Home.jsx                # Landing / pitch
    Login.jsx               # Username entry
    GameLobby.jsx           # Games list
    Profile.jsx             # User profile, stats, reset
    games/
      LuckyWheel.jsx        # Lucky Wheel game logic/UI
      GuessNumber.jsx       # Guess the Number game logic/UI
      MemoryMatch.jsx       # Memory Match game logic/UI
  components/               # Reusable UI: Navbar, GameCard, WalletDisplay, TransactionHistory, Banner, etc.
package.json                # Dependencies & scripts (vite, react, react-router-dom)
vite.config.js              # Vite configuration
index.html                  # App entry HTML
```

## Installation — run locally
1. Clone the repo and enter the directory:
```bash
git clone https://github.com/vinay5ain/cognious-game.git
cd cognious-game
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```
- The Vite dev server will usually be available at http://localhost:5173

4. Build / preview production bundle:
```bash
npm run build
npm run preview
```

## Environment variables
- None required. This is a client-side application that uses browser Local Storage only.

## API documentation
- No backend or external HTTP API is implemented. All data and logic run in the browser via React and Local Storage.

## Screenshots / Demo
- The repository does not include screenshots or a published deployment URL. The README previously listed recommended deployment targets (Vercel, Netlify, GitHub Pages), but no live link is present in the repo.

## Challenges & learning (inferred from implementation)
- State persistence: synchronizing React state with Local Storage and ensuring consistent updates across actions (transactions, daily reward, stats).
- Time-based features: implementing a reliable 24-hour cooldown for the daily reward and computing next reward times.
- Component composition: building reusable UI components and wiring them to a single Context provider.
- Client-only design: designing transaction and wallet flows entirely on the client while keeping the logic testable and isolated.
- UX & responsiveness: implementing responsive layouts with plain CSS across multiple pages and game UIs.

## Suggested realistic improvements (next steps)
- Add unit and integration tests (Jest + React Testing Library) for GameContext and game logic.
- Add TypeScript to improve type safety (optional incremental migration).
- Add accessibility improvements (keyboard nav, ARIA attributes, color-contrast checks).
- Add CI (GitHub Actions) to run tests and linting.
- Add a lightweight backend (Express + MongoDB or Firebase) if you want cross-device persistence, real authentication, and user accounts.
- Add a deployment (Vercel/Netlify) and include a live demo URL in the README.
- Add code comments where complex game logic exists and document component contracts.
- Add basic performance profiling (bundle size checks, code-splitting if needed).

## What this project demonstrates (for your GitHub/resume)
- Practical React SPA development (components, hooks, routing)
- State management with React Context and custom hooks
- Client-side persistence with Local Storage
- Building interactive UI (game logic, animations, responsive layout)
- Designing a small, maintainable frontend project structure

## Author
- Repository owner: vinay5ain (GitHub account / repo owner)

## License
- The repository contains a demo project. The existing README states the demo is proprietary to Cognieos; no open-source license file is present in the repository.

---

If you'd like, I can:
- Commit this README.md back to the repository (I can prepare the exact commit).
- Add a short CONTRIBUTING.md and DEVELOPMENT.md with commands, test scaffolding, and recommended next PR tasks.
- Create a small checklist of concrete beginner-friendly issues you can work on to make the project more recruiter-ready (tests, accessibility, deployment).
