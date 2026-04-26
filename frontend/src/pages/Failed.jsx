import { useNavigate } from "react-router-dom"

function Failed() {
  const navi = useNavigate()

  return (
    <div className="failed-page">
      <div className="failed-card">
        <div className="netflix-logo" style={{ marginBottom: "1.5rem" }}>NETFLIX</div>
        <div className="failed-icon">✕</div>
        <h2 className="failed-title">Incorrect password.</h2>
        <p className="failed-text">
          The password you entered is incorrect. Please try again or reset your password.
        </p>
        <button className="failed-btn" onClick={() => navi('/')}>
          Try Again
        </button>
        <a href="#" className="failed-link">Forgot password?</a>
      </div>
    </div>
  )
}

export default Failed