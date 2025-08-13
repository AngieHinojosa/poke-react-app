import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

type Props = { id: number; name: string; sprite?: string | null }

export default function PokemonCard({ id, name, sprite }: Props) {
  const navigate = useNavigate()
  const { favorites, toggleFavorite } = useFavorites()
  const isFav = favorites.includes(String(id))
  return (
    <div className="card">
      <img src={sprite ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'} alt={name} />
      <h3>{name}</h3>
      <div className="row">
        <button className="min" onClick={() => navigate(`/pokedex/${name}`)}>Open</button>
        <button className="min" onClick={() => toggleFavorite(String(id))}>{isFav ? 'Unfavorite' : 'Favorite'}</button>
      </div>
    </div>
  )
}
