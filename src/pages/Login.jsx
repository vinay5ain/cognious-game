import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'
import Banner from '../components/Banner'
import './Login.css'

function Login() {
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const { loginUser, user } = useGame()
  const navigate = useNavigate()

  // If already logged in, redirect to lobby
  if (user) {
    navigate('/lobby')
    return null
  }

  const handleLogin = (e) => {
    e.preventDefault()
    
    if (!username.trim()) {
      setError('Please enter a username')
      return
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      return
    }

    loginUser(username)
    navigate('/lobby')
  }

  const handleGuestLogin = () => {
    const guestName = `Guest_${Math.floor(Math.random() * 10000)}`
    loginUser(guestName)
    navigate('/lobby')
  }

  return (
    <div className="login-page">
      <Banner
        title="Join Cognieos Demo"
        subtitle="Start Playing and Earning Coins"
      >
        <p>Create an account or join as a guest to begin</p>
      </Banner>

      <div className="container">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <span className="login-icon">🎮</span>
              <h2>Login / Sign Up</h2>
            </div>

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError('')
                  }}
                  maxLength="20"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="btn btn-primary btn-large">
                Start Playing
              </button>
            </form>

            <div className="divider">or</div>

            <button
              onClick={handleGuestLogin}
              className="btn btn-secondary btn-large"
            >
              Continue as Guest
            </button>

            <div className="login-info">
              <p>
                <strong>No Registration Needed!</strong>
              </p>
              <p>This is a demo application. Choose any username to get started. Your progress is saved locally on your device.</p>
            </div>
          </div>

          <div className="login-features">
            <h3>What You Get:</h3>
            <ul>
              <li>✨ 1,000 demo coins to start</li>
              <li>💰 Daily reward bonuses</li>
              <li>🎮 Access to all games</li>
              <li>📊 Track your statistics</li>
              <li>🏆 Win more coins playing games</li>
              <li>💾 Local data storage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
