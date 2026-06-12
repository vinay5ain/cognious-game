import { useGame } from '../hooks/useGame'
import './QuickStats.css'

function QuickStats() {
  const { wallet, gameStats, isDailyRewardAvailable, getNextRewardTime } = useGame()

  const totalGamesPlayed = Object.values(gameStats).reduce((sum, game) => sum + game.played, 0)
  const totalWins = Object.values(gameStats).reduce((sum, game) => sum + game.wins, 0)
  const dailyRewardAvailable = isDailyRewardAvailable()

  return (
    <section className="quick-stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <p className="stat-label">Current Balance</p>
              <p className="stat-value">{wallet.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎮</div>
            <div className="stat-content">
              <p className="stat-label">Games Played</p>
              <p className="stat-value">{totalGamesPlayed}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <p className="stat-label">Total Wins</p>
              <p className="stat-value">{totalWins}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎁</div>
            <div className="stat-content">
              <p className="stat-label">Daily Reward</p>
              <p className={`stat-value ${dailyRewardAvailable ? 'available' : 'unavailable'}`}>
                {dailyRewardAvailable ? 'Ready!' : `In ${getNextRewardTime()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuickStats
