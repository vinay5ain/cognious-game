import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../../hooks/useGame'
import WalletDisplay from '../../components/WalletDisplay'
import './MemoryMatch.css'

function MemoryMatch() {
  const navigate = useNavigate()
  const { user, wallet, addTransaction, updateGameStats, gameStats } = useGame()
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [time, setTime] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // Redirect if not logged in
  if (!user) {
    navigate('/login')
    return null
  }

  // Card pairs (emoji)
  const cardPairs = [
    '🍎',
    '🍌',
    '🍇',
    '🍓',
    '🍊',
    '🍋',
    '🍈',
    '🍉',
    '🍑',
    '🍒',
    '🥝',
    '🍍',
  ]

  // Initialize game
  const initializeGame = () => {
    const shuffled = [...cardPairs, ...cardPairs].sort(() => Math.random() - 0.5)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setTime(0)
    setGameActive(true)
    setGameOver(false)
  }

  // Timer effect
  useEffect(() => {
    let timer
    if (gameActive && !gameOver) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [gameActive, gameOver])

  // Check for match
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped
      if (cards[first] === cards[second]) {
        setMatched([...matched, first, second])
        setFlipped([])
        setMoves((prev) => prev + 1)
      } else {
        setTimeout(() => {
          setFlipped([])
          setMoves((prev) => prev + 1)
        }, 500)
      }
    }
  }, [flipped, cards, matched])

  // Check for game over
  useEffect(() => {
    if (cards.length > 0 && matched.length === cards.length && cards.length !== 0) {
      endGame()
    }
  }, [matched, cards.length])

  const endGame = () => {
    setGameActive(false)
    setGameOver(true)
    
    // Award coins (200 for completion)
    addTransaction(200, `Memory Match - Completed in ${time}s`)
    
    // Update best time
    const bestTime = gameStats.memoryMatch.bestTime
    const currentStats = gameStats.memoryMatch
    updateGameStats('memoryMatch', {
      played: currentStats.played + 1,
      wins: currentStats.wins + 1,
      bestTime: bestTime === null || time < bestTime ? time : bestTime,
    })
  }

  const handleCardClick = (index) => {
    if (!gameActive || gameOver || flipped.includes(index) || matched.includes(index)) {
      return
    }
    setFlipped([...flipped, index])
  }

  if (cards.length === 0) {
    return (
      <div className="game-page">
        <div className="game-header">
          <h1>🧠 Memory Match</h1>
          <p>Match pairs of cards to win 200 coins!</p>
        </div>

        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <button
              className="btn btn-primary btn-large"
              onClick={initializeGame}
              style={{ marginBottom: '2rem' }}
            >
              Start Game
            </button>
            <div className="game-instructions">
              <h3>How to Play</h3>
              <ul>
                <li>Click on cards to flip them</li>
                <li>Try to find matching pairs</li>
                <li>Complete the puzzle to win 200 coins</li>
                <li>Your time and moves are tracked</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <h1>🧠 Memory Match</h1>
        <p>Match all pairs to win 200 coins!</p>
      </div>

      <div className="container">
        <div className="game-container-memory">
          <div className="game-main-memory">
            {/* Game Stats Bar */}
            <div className="memory-stats-bar">
              <div className="stat-item">
                <span>⏱️ Time:</span>
                <span className="value">{time}s</span>
              </div>
              <div className="stat-item">
                <span>🎯 Moves:</span>
                <span className="value">{moves}</span>
              </div>
              <div className="stat-item">
                <span>✅ Matched:</span>
                <span className="value">{matched.length / 2}</span>
              </div>
              <div className="stat-item">
                <span>🎴 Total:</span>
                <span className="value">{cards.length / 2}</span>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="memory-grid">
              {cards.map((card, index) => (
                <button
                  key={index}
                  className={`memory-card ${
                    flipped.includes(index) || matched.includes(index) ? 'flipped' : ''
                  }`}
                  onClick={() => handleCardClick(index)}
                  disabled={gameOver}
                >
                  <div className="card-inner">
                    <div className="card-front">?</div>
                    <div className="card-back">{card}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Game Over Message */}
            {gameOver && (
              <div className="game-over-container">
                <h2>🎉 Congratulations!</h2>
                <p>You completed the puzzle!</p>
                <div className="final-stats">
                  <div>
                    <span className="label">Time:</span>
                    <span className="value">{time}s</span>
                  </div>
                  <div>
                    <span className="label">Moves:</span>
                    <span className="value">{moves}</span>
                  </div>
                  <div>
                    <span className="label">Reward:</span>
                    <span className="value reward">+200 coins</span>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={initializeGame}
                  style={{ marginRight: '1rem' }}
                >
                  Play Again
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/lobby')}>
                  Back to Games
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="game-sidebar">
            <WalletDisplay balance={wallet} />

            <div className="game-info-box">
              <h3>Game Info</h3>
              <p>
                <strong>Pairs:</strong> {cards.length / 2}
              </p>
              <p>
                <strong>Best Time:</strong>{' '}
                {gameStats.memoryMatch.bestTime ? `${gameStats.memoryMatch.bestTime}s` : 'N/A'}
              </p>
              <p>
                <strong>Times Completed:</strong> {gameStats.memoryMatch.wins}
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        {!gameOver && (
          <div className="game-actions">
            <button className="btn btn-secondary" onClick={() => navigate('/lobby')}>
              Back to Games
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemoryMatch
