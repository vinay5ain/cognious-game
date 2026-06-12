import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import GameLobby from './pages/GameLobby'
import Profile from './pages/Profile'
import LuckyWheel from './pages/games/LuckyWheel'
import GuessNumber from './pages/games/GuessNumber'
import MemoryMatch from './pages/games/MemoryMatch'
import './App.css'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/lobby" element={<GameLobby />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/game/lucky-wheel" element={<LuckyWheel />} />
              <Route path="/game/guess-number" element={<GuessNumber />} />
              <Route path="/game/memory-match" element={<MemoryMatch />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
