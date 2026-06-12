import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'
import Banner from '../components/Banner'
import WalletDisplay from '../components/WalletDisplay'
import TransactionHistory from '../components/TransactionHistory'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const { user, wallet, gameStats, transactions, resetProgress } = useGame()

  // Redirect to login if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Are you sure you want to reset all progress? This cannot be undone.'
    )
    if (confirmed) {
      resetProgress()
      navigate('/login')
    }
  }

  const joinedDate = new Date(user.joinedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="profile-page">
      <Banner
        title="Player Profile"
        subtitle={`Welcome back, ${user.username}!`}
      >
        <p>Here's your gaming journey at a glance</p>
      </Banner>

      <div className="container">
        {/* User Info */}
        <section className="profile-header">
          <div className="user-card">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <h2>{user.username}</h2>
              <p>Member since {joinedDate}</p>
            </div>
          </div>
        </section>

        {/* Wallet Display */}
        <div className="wallet-section">
          <WalletDisplay balance={wallet} title="Total Demo Coins" />
        </div>

        {/* Game Statistics */}
        <section className="stats-section">
          <h2>Game Statistics</h2>
          <div className="stats-grid">
            {/* Lucky Wheel Stats */}
            <div className="stat-card">
              <div className="stat-icon">🎡</div>
              <h3>Lucky Wheel</h3>
              <div className="stat-details">
                <p>
                  <strong>Played:</strong> {gameStats.luckyWheel.played} times
                </p>
                <p>
                  <strong>Wins:</strong> {gameStats.luckyWheel.wins} times
                </p>
                <p>
                  <strong>Total Coins Won:</strong> {gameStats.luckyWheel.totalCoinsWon}
                </p>
              </div>
            </div>

            {/* Guess Number Stats */}
            <div className="stat-card">
              <div className="stat-icon">🔢</div>
              <h3>Guess The Number</h3>
              <div className="stat-details">
                <p>
                  <strong>Played:</strong> {gameStats.guessNumber.played} times
                </p>
                <p>
                  <strong>Wins:</strong> {gameStats.guessNumber.wins} times
                </p>
                <p>
                  <strong>Total Coins Won:</strong> {gameStats.guessNumber.totalCoinsWon}
                </p>
              </div>
            </div>

            {/* Memory Match Stats */}
            <div className="stat-card">
              <div className="stat-icon">🧠</div>
              <h3>Memory Match</h3>
              <div className="stat-details">
                <p>
                  <strong>Played:</strong> {gameStats.memoryMatch.played} times
                </p>
                <p>
                  <strong>Completions:</strong> {gameStats.memoryMatch.wins} times
                </p>
                <p>
                  <strong>Best Time:</strong>{' '}
                  {gameStats.memoryMatch.bestTime
                    ? `${gameStats.memoryMatch.bestTime}s`
                    : 'Not played'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Overall Statistics */}
        <section className="overall-stats">
          <h3>Overall Statistics</h3>
          <div className="overall-grid">
            <div className="overall-stat">
              <span className="stat-value">
                {gameStats.luckyWheel.played +
                  gameStats.guessNumber.played +
                  gameStats.memoryMatch.played}
              </span>
              <span className="stat-label">Total Games Played</span>
            </div>
            <div className="overall-stat">
              <span className="stat-value">
                {gameStats.luckyWheel.wins +
                  gameStats.guessNumber.wins +
                  gameStats.memoryMatch.wins}
              </span>
              <span className="stat-label">Total Wins</span>
            </div>
            <div className="overall-stat">
              <span className="stat-value">
                {gameStats.luckyWheel.totalCoinsWon +
                  gameStats.guessNumber.totalCoinsWon}
              </span>
              <span className="stat-label">Total Coins Earned</span>
            </div>
          </div>
        </section>

        {/* Transaction History */}
        <TransactionHistory transactions={transactions} limit={10} />

        {/* Profile Actions */}
        <section className="profile-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/lobby')}>
            Back to Games
          </button>
          <button className="btn btn-outline" onClick={handleReset}>
            Reset Progress
          </button>
        </section>
      </div>
    </div>
  )
}

export default Profile
