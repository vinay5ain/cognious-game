import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../hooks/useGame'
import WalletDisplay from '../../components/WalletDisplay'
import './GuessNumber.css'

function GuessNumber() {
  const navigate = useNavigate()
  const { user, wallet, addTransaction, updateGameStats, gameStats } = useGame()
  const [secretNumber, setSecretNumber] = useState(null)
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')
  const [reward, setReward] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  // Redirect if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  // Initialize game
  useEffect(() => {
    resetGame()
  }, [])

  const resetGame = () => {
    const newNumber = Math.floor(Math.random() * 10) + 1
    setSecretNumber(newNumber)
    setSelectedNumber(null)
    setResult(null)
    setMessage('')
    setReward(0)
    setGameOver(false)
  }

  const handleGuess = (number) => {
    setSelectedNumber(number)

    // Determine result
    if (number === secretNumber) {
      // Correct guess
      setResult('correct')
      setMessage('🎉 Correct! You won 100 coins!')
      setReward(100)
      addTransaction(100, 'Guess The Number - Correct guess')

      // Update stats
      const currentStats = gameStats.guessNumber
      updateGameStats('guessNumber', {
        played: currentStats.played + 1,
        wins: currentStats.wins + 1,
        totalCoinsWon: currentStats.totalCoinsWon + 100,
      })
    } else {
      // Wrong guess
      setResult('wrong')
      setMessage(`❌ Wrong! The number was ${secretNumber}. You lost 20 coins.`)
      setReward(-20)
      addTransaction(-20, 'Guess The Number - Wrong guess')

      // Update stats
      const currentStats = gameStats.guessNumber
      updateGameStats('guessNumber', {
        played: currentStats.played + 1,
        wins: currentStats.wins,
        totalCoinsWon: currentStats.totalCoinsWon,
      })
    }

    setGameOver(true)
  }

  const numbers = Array.from({ length: 10 }, (_, i) => i + 1)

  return (
    <div className="game-page">
      <div className="game-header">
        <h1>🔢 Guess The Number</h1>
        <p>Pick a number between 1 and 10. Get it right to win 100 coins!</p>
      </div>

      <div className="container">
        <div className="game-container">
          <div className="game-main">
            {/* Game Description */}
            <div className="game-description">
              <p>
                I'm thinking of a number between 1 and 10. Can you guess it? If you're right, you
                win 100 coins. If you're wrong, you lose 20 coins.
              </p>
            </div>

            {/* Number Grid */}
            <div className="numbers-grid">
              {numbers.map((number) => (
                <button
                  key={number}
                  className={`number-button ${selectedNumber === number ? 'selected' : ''} ${
                    gameOver && selectedNumber === number ? result : ''
                  }`}
                  onClick={() => !gameOver && handleGuess(number)}
                  disabled={gameOver}
                >
                  {number}
                </button>
              ))}
            </div>

            {/* Result Message */}
            {gameOver && (
              <div className={`result-container ${result}`}>
                <p className={`result-message ${result}`}>{message}</p>
                <p className="result-reward">
                  {reward > 0 ? `+${reward}` : reward} coins
                </p>
              </div>
            )}

            {/* Game Stats */}
            <div className="game-stats">
              <div className="stat">
                <span className="stat-label">Games Played</span>
                <span className="stat-value">{gameStats.guessNumber.played}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Wins</span>
                <span className="stat-value">{gameStats.guessNumber.wins}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Win Rate</span>
                <span className="stat-value">
                  {gameStats.guessNumber.played > 0
                    ? Math.round((gameStats.guessNumber.wins / gameStats.guessNumber.played) * 100)
                    : 0}
                  %
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Total Coins Won</span>
                <span className="stat-value">{gameStats.guessNumber.totalCoinsWon}</span>
              </div>
            </div>

            {/* Play Again Button */}
            {gameOver && (
              <button className="btn btn-primary" onClick={resetGame} style={{ width: '100%' }}>
                Play Again
              </button>
            )}
          </div>

          {/* Wallet Display */}
          <div className="game-sidebar">
            <WalletDisplay balance={wallet} />

            {/* How to Play */}
            <div className="how-to-play">
              <h3>How to Play</h3>
              <ul>
                <li>📝 Select a number from 1-10</li>
                <li>✅ If correct: +100 coins</li>
                <li>❌ If wrong: -20 coins</li>
                <li>🔄 Play as many times as you want</li>
                <li>⚡ No time limit</li>
              </ul>
            </div>
          </div>
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

export default GuessNumber
