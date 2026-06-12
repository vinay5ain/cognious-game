import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Cognieos Demo</h4>
            <p>Interactive gaming platform showcasing development capabilities</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/lobby">Games</a>
              </li>
              <li>
                <a href="/profile">Profile</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Why Choose Cognieos?</h4>
            <ul className="features-list">
              <li>✨ Custom gaming experiences</li>
              <li>🎨 Interactive UI development</li>
              <li>💰 Reward systems</li>
              <li>📱 Mobile-responsive apps</li>
              <li>⚡ Fast deployment</li>
              <li>🚀 Scalable architecture</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="disclaimer">
            ⚠️ This application is a demonstration developed by Cognieos to showcase technical
            capabilities. It does not support real-money gambling or financial transactions.
          </p>
          <p className="copyright">
            &copy; {currentYear} Cognieos. All rights reserved. | Demonstration Use Only
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
