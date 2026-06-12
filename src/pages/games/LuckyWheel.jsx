import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../hooks/useGame'
import WalletDisplay from '../../components/WalletDisplay'
import './LuckyWheel.css'

function LuckyWheel() {
  const navigate = useNavigate()
  const { user, wallet, addTransaction, updateGameStats, gameStats } = useGame()
  const [isSpinning, setIsSpinning] = useState(false)
  const [reward, setReward] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [message, setMessage] = useState('')

  // Redirect if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  const rewards = [50, 100, 200, 500]

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setReward(null)
    setMessage('')

    // Calculate rotation and reward
    const randomIndex = Math.floor(Math.random() * rewards.length)
    const selectedReward = rewards[randomIndex]
    const spinRotation = Math.random() * 360 + 720 // At least 2 full spins

    // Animate spinning
    setRotation(spinRotation)

    // Wait for animation to complete
    setTimeout(() => {
      setReward(selectedReward)
      setMessage(`🎉 You won ${selectedReward} coins!`)
      addTransaction(selectedReward, `Lucky Wheel - Won ${selectedReward} coins`)

      // Update game stats
      const currentStats = gameStats.luckyWheel
      updateGameStats('luckyWheel', {
        played: currentStats.played + 1,
        wins: currentStats.wins + 1,
        totalCoinsWon: currentStats.totalCoinsWon + selectedReward,
      })

      setIsSpinning(false)
    }, 4000)
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <h1>🎡 Lucky Wheel</h1>
        <p>Spin the wheel and try to win big!</p>
      </div>

      <div className="container">
        <div className="game-container">
          <div className="game-main">
            {/* Wheel */}
            <div className="wheel-container">
              <div className="wheel-pointer"></div>
              <div
                className={`wheel ${isSpinning ? 'spinning' : ''}`}
                style={{
                  transform: `rotate(${rotation}deg)`,
                }}
              >
                {rewards.map((value, index) => {
                  const angle = (360 / rewards.length) * index
                  return (
                    <div
                      key={index}
                      className="wheel-segment"
                      style={{
                        transform: `rotate(${angle}deg)`,
                      }}
                    >
                      <span className="wheel-value">{value}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Controls and Info */}
            <div className="game-controls">
              <div className="game-info-panel">
                <div className="info-item">
                  <span className="info-label">Current Balance</span>
                  <span className="info-value">{wallet}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Spins</span>
                  <span className="info-value">{gameStats.luckyWheel.played}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Total Wins</span>
                  <span className="info-value">{gameStats.luckyWheel.totalCoinsWon}</span>
                </div>
              </div>

              <button
                className={`btn btn-primary btn-spin ${isSpinning ? 'disabled' : ''}`}
                onClick={handleSpin}
                disabled={isSpinning}
              >
                {isSpinning ? 'Spinning...' : 'SPIN NOW'}
              </button>

              {message && <p className="game-message success">{message}</p>}
            </div>
          </div>

          {/* Game Instructions */}
          <div className="game-instructions">
            <h3>How to Play</h3>
            <ul>
              <li>Click the "SPIN NOW" button to start spinning</li>
              <li>The wheel will rotate and land on a random segment</li>
              <li>Your reward is the value shown on the segment</li>
              <li>You can spin as many times as you want!</li>
              <li>Rewards: 50, 100, 200, or 500 coins</li>
            </ul>
          </div>
        </div>

        {/* Wallet Display */}
        <div className="game-wallet">
          <WalletDisplay balance={wallet} />
        </div>

        {/* Back Button */}
        <div className="game-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/lobby')}>
            Back to Games
          </button>
        </div>
      </div>
    </div>
  )
}

export default LuckyWheel
