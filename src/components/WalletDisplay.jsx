import './WalletDisplay.css'

function WalletDisplay({ balance, title = 'Current Balance' }) {
  return (
    <div className="wallet-display">
      <div className="wallet-content">
        <div className="wallet-icon">💰</div>
        <div className="wallet-info">
          <span className="wallet-label">{title}</span>
          <span className="wallet-balance">{balance}</span>
        </div>
      </div>
    </div>
  )
}

export default WalletDisplay
