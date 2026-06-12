import { Link } from 'react-router-dom'
import './GameCard.css'

function GameCard({ id, title, description, icon, category, reward, path, onPlay, color }) {
  const handleClick = (e) => {
    if (onPlay) {
      onPlay()
    }
  }

  return (
    <Link to={path} className="game-card" style={{ '--accent-color': color }} onClick={handleClick}>
      {/* Thumbnail Area */}
      <div className="game-thumbnail">
        <div className="game-icon-container">{icon}</div>
        <div className="game-overlay">
          <span className="play-icon">▶</span>
        </div>
      </div>

      {/* Content Area */}
      <div className="game-body">
        <div className="game-meta">
          <span className="game-category">{category}</span>
        </div>

        <h3 className="game-title">{title}</h3>
        <p className="game-description">{description}</p>

        {/* Footer */}
        <div className="game-footer">
          <div className="game-reward">
            <span className="reward-icon">💰</span>
            <span className="reward-text">{reward}</span>
          </div>
          <button className="play-button" type="button" aria-label={`Play ${title}`}>
            Play
          </button>
        </div>
      </div>
    </Link>
  )
}

export default GameCard
