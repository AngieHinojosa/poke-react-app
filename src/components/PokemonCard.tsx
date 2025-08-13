import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import FavoritesButton from './FavoritesButton'

type Props = { id: number; name: string; sprite?: string | null }

export default function PokemonCard({ id, name, sprite }: Props) {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.includes(String(id))

  const go = () => navigate(`/pokedex/${name}`)
  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      go()
    }
  }

  return (
    <div
      className="retro-tile"
      role="button"
      tabIndex={0}
      aria-label={`Open ${name} details`}
      onClick={go}
      onKeyDown={onKey}
    >
      <div className="tile-bar">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>

      <div className="tile-body">
        <div className="sprite-frame">
          <img
            src={sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'}
            alt={name}
          />
        </div>
      </div>

      <div className="tile-meta">
        <span className="rid">#{id.toString().padStart(3,'0')}</span>
        <h3>{name}</h3>
        <p className="muted">Tap to open details</p>
      </div>

      <div className="tile-actions">
        <button
          className="min primary"
          onClick={(e) => { e.stopPropagation(); go(); }}
        >
          Open
        </button>
        <FavoritesButton
          isFav={isFav}
          onToggle={() => toggleFavorite(String(id))}
        />
      </div>
    </div>
  )
}
