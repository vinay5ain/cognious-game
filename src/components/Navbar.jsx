import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGame } from '../hooks/useGame'
import MobileMenu from './MobileMenu'
import './Navbar.css'

function Navbar() {
  const { user, wallet } = useGame()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-brand" onClick={handleLogoClick} role="button" tabIndex={0}>
            <span className="logo-icon" aria-hidden="true">🎮</span>
            <span className="logo-text">Cognieos</span>
          </div>

          {/* Desktop Menu */}
          <ul className="navbar-menu">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/lobby" className="nav-link">
                Games
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
            )}
          </ul>

          {/* Right Section */}
          <div className="navbar-right">
            {user && (
              <div className="wallet-display">
                <span className="wallet-icon" aria-hidden="true">💰</span>
                <span className="wallet-amount" aria-label={`Current balance: ${wallet} coins`}>
                  {wallet.toLocaleString()}
                </span>
              </div>
            )}
            {!user && (
              <Link to="/login" className="btn btn-primary btn-small">
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="hamburger-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} wallet={wallet} />
    </>
  )
}

export default Navbar
