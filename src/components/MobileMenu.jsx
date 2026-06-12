import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './MobileMenu.css'

function MobileMenu({ isOpen, onClose, wallet }) {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <nav className="mobile-menu">
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <ul className="mobile-menu-list">
          <li>
            <a onClick={() => handleNavigate('/')} role="button">
              Home
            </a>
          </li>
          <li>
            <a onClick={() => handleNavigate('/lobby')} role="button">
              Games
            </a>
          </li>
          <li>
            <a onClick={() => handleNavigate('/profile')} role="button">
              Profile
            </a>
          </li>
        </ul>

        <div className="mobile-menu-wallet">
          <span className="mobile-menu-wallet-icon">💰</span>
          <span className="mobile-menu-wallet-label">Balance</span>
          <span className="mobile-menu-wallet-amount">{wallet}</span>
        </div>
      </nav>
    </>
  )
}

export default MobileMenu
