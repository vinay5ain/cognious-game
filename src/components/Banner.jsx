import { useNavigate } from 'react-router-dom'
import './Banner.css'

function Banner({ title, subtitle, backgroundImage, children, cta }) {
  const navigate = useNavigate()

  const handleCTA = () => {
    if (cta && typeof cta === 'function') {
      cta()
    }
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      }}
    >
      <div className="banner-overlay"></div>
      <div className="banner-content">
        {title && <h1>{title}</h1>}
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        {children}
        {cta && (
          <button className="btn btn-primary banner-cta" onClick={handleCTA}>
            Play Games
          </button>
        )}
      </div>
    </div>
  )
}

export default Banner
