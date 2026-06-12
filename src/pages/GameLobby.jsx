import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'
import Banner from '../components/Banner'
import GameCard from '../components/GameCard'
import CategoryTabs from '../components/CategoryTabs'
import WalletDisplay from '../components/WalletDisplay'
import DailyReward from '../components/DailyReward'
import './GameLobby.css'

function GameLobby() {
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()
  const { user, wallet } = useGame()

  // Redirect to login if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  const categories = ['All', 'Spin', 'Logic', 'Puzzle']

  const games = [
    {
      id: 1,
      title: 'Lucky Wheel',
      description: 'Spin the wheel and win demo coins. Try your luck!',
      icon: '🎡',
      category: 'Spin',
      reward: '50-500',
      path: '/game/lucky-wheel',
    },
    {
      id: 2,
      title: 'Guess The Number',
      description: 'Pick a number between 1-10. Simple but exciting!',
      icon: '🔢',
      category: 'Logic',
      reward: '100',
      path: '/game/guess-number',
    },
    {
      id: 3,
      title: 'Memory Match',
      description: 'Find matching pairs and improve your memory skills.',
      icon: '🧠',
      category: 'Puzzle',
      reward: '200',
      path: '/game/memory-match',
    },
  ]

  // Filter games based on selected category
  const filteredGames =
    activeCategory === 'All'
      ? games
      : games.filter((game) => game.category === activeCategory)

  return (
    <div className="lobby-page">
      <Banner
        title="Game Lobby"
        subtitle="Choose Your Next Adventure"
      >
        <p>Welcome, {user.username}! Select a game and start earning coins.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/profile')}>
            View Profile
          </button>
        </div>
      </Banner>

      <div className="container">
        {/* Wallet and Daily Reward */}
        <div className="lobby-top">
          <WalletDisplay balance={wallet} />
          <DailyReward />
        </div>

        {/* Category Tabs */}
        <CategoryTabs
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />

        {/* Games Grid */}
        <section className="games-section">
          {filteredGames.length > 0 ? (
            <div className="games-grid">
              {filteredGames.map((game) => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No games in this category yet. Check back soon!</p>
            </div>
          )}
        </section>

        {/* Game Info */}
        <section className="game-info">
          <div className="info-card">
            <h3>How to Play</h3>
            <ul>
              <li>🎮 Select a game from the lobby</li>
              <li>💰 Earn or lose demo coins based on performance</li>
              <li>📊 Your stats are tracked automatically</li>
              <li>🏆 Check your profile to see your progress</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Earn More Coins</h3>
            <ul>
              <li>🎯 Win games to earn coins</li>
              <li>🎁 Claim daily rewards every 24 hours</li>
              <li>🌟 Complete all games for achievements</li>
              <li>💡 Better performance = bigger rewards</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

export default GameLobby
