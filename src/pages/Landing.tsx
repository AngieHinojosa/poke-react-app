import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import '../styles/landing.css'

export default function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter') navigate('/grid') }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  return (
    <main className="landing">
      <section className="retro">
        <div className="retro-bar">POKÉDEX REGISTRATION</div>
        <div className="retro-grid">
          <div className="retro-col">
            <div className="kicker">PINFLAG · POKEDEX</div>
            <h1 className="retro-title">Explore and save your favorite Pokémon</h1>
            <p className="retro-subtitle">Search by name, persistent favorites, and full profiles with weight, height, and types.</p>
            <div className="retro-cta">
              <motion.button
                className="start primary"
                aria-label="Ir a la grilla"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => navigate('/grid')}
              >
                START
              </motion.button>
              <span className="hint">Press Enter ↵</span>
            </div>
          </div>

          <motion.div
            className="retro-media"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="retro-card">
              <div className="retro-head">
                <span className="rid">094</span>
                <span className="rname">GENGAR</span>
              </div>
              <div className="retro-body">
                <div className="dial" />
                <img
                  className="sprite"
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
                  alt="Gengar preview"
                />
              </div>
              <div className="retro-types">
                <span className="chip type-ghost">GHOST</span>
                <span className="chip type-poison">POISON</span>
              </div>
              <div className="retro-specs">
                <div>HT <strong>4'11"</strong></div>
                <div>WT <strong>89.3 lbs</strong></div>
              </div>
              <p className="retro-desc">The leer that floats in darkness belongs to a Gengar delighting in casting curses on people.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
