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
    <main className="landing" aria-label="Landing page">
      <motion.div
        className="landing__halo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, scale: [0.96, 1.02, 1] }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
      />
      <motion.h1
        className="landing__title"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Pokédex Challenge
      </motion.h1>
      <motion.p
        className="landing__subtitle"
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Explore. Filter. Favorite. Learn.
      </motion.p>
      <motion.button
        className="landing__start"
        aria-label="Start app and go to grid"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onClick={() => navigate('/grid')}
      >
        START
      </motion.button>
      <div className="landing__hint" aria-hidden="true">Press Enter ↵</div>
    </main>
  )
}
