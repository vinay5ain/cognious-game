import { useState, useEffect } from 'react'
import { useGame } from '../hooks/useGame'
import './DailyReward.css'

function DailyReward() {
  const { claimDailyReward, isDailyRewardAvailable, getNextRewardTime } = useGame()
  const [claimed, setClaimed] = useState(false)
  const [nextRewardTime, setNextRewardTime] = useState(null)

  useEffect(() => {
    if (!isDailyRewardAvailable()) {
      setNextRewardTime(getNextRewardTime())
    }
  }, [isDailyRewardAvailable, getNextRewardTime])

  const handleClaim = () => {
    const success = claimDailyReward()
    if (success) {
      setClaimed(true)
      setTimeout(() => setClaimed(false), 3000)
    }
  }

  const canClaim = isDailyRewardAvailable()
  const timeUntilReward = nextRewardTime
    ? new Date(nextRewardTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    : ''

  return (
    <div className="daily-reward">
      <div className="daily-reward-content">
        <div className="daily-reward-info">
          <span className="daily-reward-icon">🎁</span>
          <div>
            <h4>Daily Reward</h4>
            <p>Claim 100 bonus coins once every 24 hours</p>
          </div>
        </div>
        <button
          className={`btn ${canClaim ? 'btn-primary' : 'btn-disabled'}`}
          onClick={handleClaim}
          disabled={!canClaim}
        >
          {claimed ? '✓ Claimed!' : canClaim ? 'Claim Now' : `Next: ${timeUntilReward}`}
        </button>
      </div>
    </div>
  )
}

export default DailyReward
