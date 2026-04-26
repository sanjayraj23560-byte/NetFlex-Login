import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import introVideo from "../assets/intro.mp4"

const movies = {
  trending: [
    { id: 1,  title: "Stranger Things",      year: 2022, rating: "TV-14", score: "97%", genre: "Sci-Fi",   img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
    { id: 2,  title: "The Crown",            year: 2023, rating: "TV-MA", score: "89%", genre: "Drama",    img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80" },
    { id: 3,  title: "Squid Game",           year: 2021, rating: "TV-MA", score: "95%", genre: "Thriller", img: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&q=80" },
    { id: 4,  title: "Wednesday",            year: 2022, rating: "TV-14", score: "92%", genre: "Horror",   img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80" },
    { id: 5,  title: "Ozark",               year: 2022, rating: "TV-MA", score: "88%", genre: "Crime",    img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80" },
    { id: 6,  title: "Black Mirror",         year: 2023, rating: "TV-MA", score: "83%", genre: "Sci-Fi",   img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80" },
  ],
  action: [
    { id: 7,  title: "Extraction",           year: 2023, rating: "R",     score: "91%", genre: "Action",   img: "https://images.unsplash.com/photo-1547638375-ebf04735d792?w=400&q=80" },
    { id: 8,  title: "The Gray Man",         year: 2022, rating: "PG-13", score: "85%", genre: "Action",   img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400&q=80" },
    { id: 9,  title: "Red Notice",           year: 2021, rating: "PG-13", score: "80%", genre: "Action",   img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80" },
    { id: 10, title: "Army of the Dead",     year: 2021, rating: "R",     score: "76%", genre: "Action",   img: "https://images.unsplash.com/photo-1533236897688-6316b75cf88a?w=400&q=80" },
    { id: 11, title: "Project Power",        year: 2020, rating: "R",     score: "79%", genre: "Action",   img: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?w=400&q=80" },
    { id: 12, title: "6 Underground",        year: 2019, rating: "R",     score: "74%", genre: "Action",   img: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=400&q=80" },
  ],
  comedy: [
    { id: 13, title: "The Witcher",          year: 2023, rating: "TV-MA", score: "88%", genre: "Fantasy",  img: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=400&q=80" },
    { id: 14, title: "Emily in Paris",       year: 2022, rating: "TV-MA", score: "72%", genre: "Comedy",   img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80" },
    { id: 15, title: "Never Have I Ever",    year: 2023, rating: "TV-14", score: "90%", genre: "Comedy",   img: "https://images.unsplash.com/photo-1523495338267-c3ba86fc58d4?w=400&q=80" },
    { id: 16, title: "Sex Education",        year: 2023, rating: "TV-MA", score: "93%", genre: "Comedy",   img: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=400&q=80" },
    { id: 17, title: "Umbrella Academy",     year: 2023, rating: "TV-14", score: "87%", genre: "Sci-Fi",   img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80" },
    { id: 18, title: "Bridgerton",           year: 2022, rating: "TV-MA", score: "89%", genre: "Romance",  img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&q=80" },
  ]
}

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false)
  const [liked, setLiked]     = useState(false)

  return (
    <div
      className={`movie-card ${hovered ? "movie-card-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={movie.img} alt={movie.title} className="movie-img" />

      {hovered && (
        <div className="movie-overlay">
          <div className="movie-overlay-top">
            <span className="movie-score">{movie.score} Match</span>
            <span className="movie-rating-badge">{movie.rating}</span>
            <span className="movie-year">{movie.year}</span>
          </div>
          <p className="movie-overlay-title">{movie.title}</p>
          <p className="movie-genre">{movie.genre}</p>
          <div className="movie-actions">
            <button className="mo-btn mo-play">▶</button>
            <button
              className={`mo-btn mo-like ${liked ? "mo-liked" : ""}`}
              onClick={e => { e.stopPropagation(); setLiked(p => !p) }}
            >
              {liked ? "♥" : "♡"}
            </button>
            <button className="mo-btn mo-info">ℹ</button>
          </div>
        </div>
      )}

      <div className="movie-title-bar">{movie.title}</div>
    </div>
  )
}

function MovieRow({ title, data }) {
  const rowRef = useRef(null)
  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" })
  }

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-wrap">
        <button className="row-arrow row-left"  onClick={() => scroll(-1)}>‹</button>
        <div className="row-scroll" ref={rowRef}>
          {data.map(m => <MovieCard key={m.id} movie={m} />)}
        </div>
        <button className="row-arrow row-right" onClick={() => scroll(1)}>›</button>
      </div>
    </div>
  )
}

function Success() {
  const [phase, setPhase]         = useState("video")   // video | home
  const [muted, setMuted]         = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch]       = useState("")
  const [profile, setProfile]     = useState(false)
  const [navSolid, setNavSolid]   = useState(false)
  const videoRef = useRef(null)
  const navi = useNavigate()

  // Auto end video
  const handleVideoEnd = () => setPhase("home")

  const skipIntro = () => setPhase("home")

  // Navbar background on scroll
  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // ── VIDEO INTRO ────────────────────────────────────────────────
  if (phase === "video") {
    return (
      <div className="video-screen">
        <video
          ref={videoRef}
          className="intro-video"
          src={introVideo}
          autoPlay
          muted={muted}
          playsInline
          onEnded={handleVideoEnd}
        />

        {/* Controls overlay */}
        <div className="video-controls">
        </div>

        {/* Netflix logo on video */}
        <div className="video-logo">NETFLIX</div>
      </div>
    )
  }

  // ── HOME PAGE ─────────────────────────────────────────────────
  return (
    <div className="home-page">

      {/* Navbar */}
      <nav className={`home-nav ${navSolid ? "home-nav-solid" : ""}`}>
        <div className="nav-left">
          <div className="netflix-logo">NETFLIX</div>
          <div className="nav-links">
            {["Home","TV Shows","Movies","New & Popular","My List","Browse by Languages"].map(link => (
              <a key={link} href="#">{link}</a>
            ))}
          </div>
        </div>
        <div className="nav-right">
          <div className={`search-wrap ${showSearch ? "search-open" : ""}`}>
            {showSearch && (
              <input
                autoFocus
                className="nav-search"
                placeholder="Titles, people, genres"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onBlur={() => { if (!search) setShowSearch(false) }}
              />
            )}
            <button className="nav-icon-btn" onClick={() => setShowSearch(p => !p)}>
              🔍
            </button>
          </div>
          <button className="nav-icon-btn">🔔</button>
          <div className="profile-wrap">
            <div className="profile-avatar" onClick={() => setProfile(p => !p)}>
              <span>ABC</span>
              <span className="profile-caret">▾</span>
            </div>
            {profile && (
              <div className="profile-menu">
                <div className="profile-menu-top">
                  <div className="pm-avatar">ABC</div>
                  <span>ABC</span>
                </div>
                <div className="pm-divider" />
                <div className="profile-item">👤 Manage Profiles</div>
                <div className="profile-item">⚙️ Account</div>
                <div className="profile-item">❓ Help Centre</div>
                <div className="pm-divider" />
                <div className="profile-item signout" onClick={() => navi('/')}>
                  Sign out of Netflix
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-gradient" />
        <div className="hero-content">
          <div className="hero-logo-img">
            <span className="hero-show-logo">STRANGER THINGS</span>
          </div>
          <div className="hero-meta">
            <span className="hero-match">98% Match</span>
            <span className="hero-new">New Season</span>
            <span className="hero-year">2024</span>
            <span className="hero-rating-badge">TV-14</span>
            <span className="hero-seasons">5 Seasons</span>
          </div>
          <p className="hero-desc">
            When a boy vanishes, a small town uncovers a mystery involving secret experiments,
            terrifying supernatural forces and one strange little girl.
          </p>
          {/* <div className="hero-btns">
            <button className="hero-btn hero-play">▶&nbsp; Play</button>
            <button className="hero-btn hero-more">ℹ&nbsp; More Info</button>
          </div> */}
        </div>
        <button
          className="hero-mute-btn"
          onClick={() => setMuted(p => !p)}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      {/* Movie Rows */}
      <div className="rows-container">
        <MovieRow title="🔥 Trending Now"       data={movies.trending} />
        <MovieRow title="💥 Action & Adventure" data={movies.action}   />
        <MovieRow title="😄 Comedies"           data={movies.comedy}   />
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <div className="netflix-logo" style={{ fontSize: "20px" }}>NETFLIX</div>
        <div className="footer-grid">
          {["Audio Description","Help Centre","Gift Cards","Media Centre",
            "Investor Relations","Jobs","Terms of Use","Privacy",
            "Legal Notices","Cookie Preferences","Corporate Information","Contact Us"
          ].map(link => <a key={link} href="#">{link}</a>)}
        </div>
        <p className="footer-copy">© 2024 Netflix Clone · Educational Purpose Only</p>
      </footer>

    </div>
  )
}

export default Success
