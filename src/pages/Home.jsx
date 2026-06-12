import { useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'
import { GAMES_ARRAY } from '../constants/games'
import Banner from '../components/Banner'
import QuickStats from '../components/QuickStats'
import GameCard from '../components/GameCard'
import './Home.css'

function Home() {
  const { user } = useGame()
  const navigate = useNavigate()

  const handleExplore = () => {
    if (user) {
      navigate('/lobby')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="home">
      {/* Hero Banner */}
      <Banner
        title="Welcome to Cognieos Demo"
        subtitle="Interactive Gaming Experiences Built by Cognieos"
        cta={() => handleExplore()}
      />

      {/* Quick Stats - Only show if logged in */}
      {user && <QuickStats />}

      <div className="container">
        {/* Featured Games Section */}
        <section className="section">
          <h2 className="section-title">🎮 Featured Games</h2>
          <div className="games-grid">
            {GAMES_ARRAY.map((game) => (
              <GameCard key={game.id} {...game} color={game.color} />
            ))}
          </div>
        </section>

        {/* Why Choose Cognieos Section */}
        <section className="section">
          <h2 className="section-title">✨ Why Choose Cognieos?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🎨</span>
              <h3>Custom Gaming Experiences</h3>
              <p>Tailored game designs that match your brand and engage your users with unique, interactive mechanics.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💻</span>
              <h3>Modern UI/UX Design</h3>
              <p>Beautiful, responsive interfaces with smooth animations and intuitive user experiences across all devices.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">💰</span>
              <h3>Flexible Reward Systems</h3>
              <p>Customizable wallet and coin systems for gamification, loyalty programs, and user engagement metrics.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📱</span>
              <h3>Mobile-First Design</h3>
              <p>Fully responsive applications that work seamlessly on smartphones, tablets, desktops, and more.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">⚡</span>
              <h3>Fast Deployment</h3>
              <p>Quick turnaround times from concept to production with optimized builds and continuous delivery.</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🚀</span>
              <h3>Scalable Architecture</h3>
              <p>Built for growth—from MVP to enterprise-level applications with proven scalability patterns.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section section">
          <div className="cta-content">
            <h2>Ready to Build Your Next Gaming Platform?</h2>
            <p>
              This demo showcases Cognieos' capabilities. Let's create something amazing for your users.
            </p>
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleExplore}>
                🎮 Play Now
              </button>
              <button className="btn btn-outline">
                📧 Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
