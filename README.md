# 🎮 Cognieos Demo - Interactive Gaming Platform

An interactive gaming platform web application built with React and JavaScript to showcase **Cognieos' development capabilities**. This is a **demonstration project** featuring multiple games, a wallet system, player statistics, and a modern dark-themed UI.

## ⚠️ Disclaimer

**This application is a demonstration developed by Cognieos to showcase technical capabilities. It does not support real-money gambling or financial transactions.**

---

## ✨ Features

### 🎮 Games
- **Lucky Wheel**: Spin the wheel to win demo coins (50-500 coins)
- **Guess The Number**: Guess a number between 1-10 (+100 coins win, -20 coins loss)
- **Memory Match**: Match card pairs to win 200 coins

### 💰 Wallet System
- Start with **1,000 demo coins**
- Real-time balance tracking
- Daily reward system (100 coins every 24 hours)
- Complete transaction history
- Local storage persistence

### 📊 Player Profile
- Username tracking
- Game statistics per game
- Total wins and games played
- Win rates calculation
- Best scores (Memory Match)
- Progress reset option

### 🎨 User Interface
- Dark purple gaming aesthetic with gold highlights
- Fully responsive mobile-first design
- Smooth animations and transitions
- Modern card-based layouts
- Interactive hover effects
- Loading and empty states

### 🔧 Technical Features
- React Context API for state management
- React Router for navigation
- Local Storage for data persistence
- CSS Modules and plain CSS styling
- No backend required
- Vite for fast development

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd cognieos-demo
```

2. **Install dependencies:**
```bash
npm install
```

### Running the Application

**Development Mode:**
```bash
npm run dev
```
The application will start at `http://localhost:5173`

**Build for Production:**
```bash
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/              # Reusable components
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Banner.jsx
│   ├── GameCard.jsx
│   ├── WalletDisplay.jsx
│   ├── CategoryTabs.jsx
│   ├── DailyReward.jsx
│   └── TransactionHistory.jsx
│
├── pages/                   # Page components
│   ├── Home.jsx            # Home page with pitch section
│   ├── Login.jsx           # Login/Sign-up page
│   ├── GameLobby.jsx       # Games selection
│   ├── Profile.jsx         # Player profile
│   └── games/              # Game pages
│       ├── LuckyWheel.jsx
│       ├── GuessNumber.jsx
│       └── MemoryMatch.jsx
│
├── context/
│   └── GameContext.jsx     # React Context for state management
│
├── hooks/
│   └── useGame.js          # Custom hook for context
│
├── App.jsx                 # Main app component with routing
├── main.jsx               # Entry point
├── index.css              # Global styles
└── App.css                # App-specific styles
```

---

## 🎮 How to Play Each Game

### Lucky Wheel
1. Click the **"SPIN NOW"** button
2. The wheel rotates and lands on a random segment
3. You win the coins shown on that segment
4. Possible rewards: 50, 100, 200, or 500 coins

### Guess The Number
1. Select a number between 1 and 10
2. If you guess correctly: **+100 coins**
3. If you guess wrong: **-20 coins** and see the correct answer
4. Play as many times as you want

### Memory Match
1. Flip cards to find matching pairs
2. The game tracks your time and moves
3. Complete the puzzle to earn **200 coins**
4. Your best time is automatically saved

---

## 💾 Data Storage

All data is stored in the **browser's Local Storage**:

- **cognieos_user**: Username and join date
- **cognieos_wallet**: Current demo coin balance
- **cognieos_transactions**: Complete transaction history
- **cognieos_gameStats**: Statistics for each game
- **cognieos_lastDailyReward**: Last daily reward timestamp

Data persists across browser sessions and can be cleared by resetting progress in the Profile page.

---

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#1a0d2e`
- **Secondary Dark**: `#2d1b4e`
- **Accent Gold**: `#d4af37`
- **Accent Purple**: `#a855f7`
- **Accent Cyan**: `#00d4ff`
- **Success Green**: `#10b981`

### Typography
- **Font**: System fonts (Segoe UI, Roboto, etc.)
- **H1**: 3.5rem, gradient gold
- **H2**: 2.5rem
- **H3**: 1.5rem
- **Body**: 1rem

### Responsive Breakpoints
- **Desktop**: 1024px and up
- **Tablet**: 768px to 1023px
- **Mobile**: Below 768px

---

## 🛠️ Customization

### Adding New Games
1. Create a new file in `src/pages/games/`
2. Import `useGame` hook for wallet management
3. Add route in `App.jsx`
4. Create corresponding game card in the games list

### Modifying Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --primary-dark: #1a0d2e;
  --gold: #d4af37;
  /* ... other variables */
}
```

### Adjusting Rewards
Edit reward values in individual game files:
- Lucky Wheel: `LuckyWheel.jsx` line ~30
- Guess Number: `GuessNumber.jsx` (100 and -20)
- Memory Match: `MemoryMatch.jsx` (200 coins)

---

## 🔐 Demo Limitations

- **No Backend**: All data is stored locally
- **No Real Transactions**: Demo coins are fictional
- **No User Authentication**: Username is stored locally
- **No Multiplayer**: Single-player only
- **No Persistence Across Devices**: Data doesn't sync

---

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎯 Why Choose Cognieos?

This demo showcases:

✨ **Custom Gaming Experiences**
- Tailored game designs that engage users

🎨 **Interactive UI Development**
- Modern, responsive interfaces with smooth animations

💰 **Reward Systems**
- Flexible wallet and coin systems for gamification

📱 **Mobile-Responsive Applications**
- Works seamlessly on all devices

⚡ **Fast Deployment**
- Quick turnaround from concept to production

🚀 **Scalable Architecture**
- Built to grow with your business

---

## 📝 Code Quality

- ✅ Beginner-friendly code with comments
- ✅ Clean folder structure
- ✅ Reusable components
- ✅ Error handling and empty states
- ✅ No TypeScript (JavaScript only)
- ✅ No external game libraries
- ✅ Pure React implementation

---

## 🚀 Production Deployment

### Build the Project
```bash
npm run build
```

### Deploy to Services
- **Vercel**: Recommended for React apps
- **Netlify**: Simple drag-and-drop deployment
- **GitHub Pages**: Static hosting
- **AWS Amplify**: Managed deployment

### Environment Variables
Currently, no environment variables are required as this is a client-side only application.

---

## 🐛 Troubleshooting

### Games not showing up
- Clear browser cache and local storage
- Refresh the page

### Wallet balance not updating
- Check Local Storage in browser DevTools
- Ensure JavaScript is enabled

### Responsive design issues
- Clear browser cache
- Test in different browsers

### Local Storage errors
- Ensure Private/Incognito mode is disabled
- Check browser storage limit

---

## 📞 Support & Feedback

This is a demonstration project by **Cognieos**. For custom game development or inquiries about Cognieos services, please contact the team.

---

## 📄 License

This demo application is proprietary to Cognieos and is provided for demonstration purposes only.

---

## 🙏 Credits

- Built with **React 18**
- Styled with **CSS3**
- Deployed with **Vite**
- State management with **React Context API**

---

## 🎓 Learning Resources

This project is great for learning:
- React fundamentals and hooks
- Context API for state management
- React Router for navigation
- LocalStorage API
- CSS Grid and Flexbox
- Responsive design patterns
- Component composition

---

**Enjoy the demo! 🎮✨**
#   c o g n i o u s - g a m e  
 