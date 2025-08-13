import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetail, getPokemonSpecies } from '../api/pokeapi'
import { PokemonDetail } from '../types'
import Loader from '../components/Loader'
import '../styles/pokedex.css'

type View = {
  id: number
  name: string
  types: string[]
  img: string | null
  weightKg: string
  heightM: string
  description: string
}

export default function Pokedex() {
  const { name } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<View | null>(null)

  useEffect(() => {
    let active = true
    async function run() {
      setLoading(true)
      try {
        if (!name) return
        const detail: PokemonDetail = await getPokemonDetail(name)
        const species = await getPokemonSpecies(detail.id)
        const desc = species.flavor_text_entries.find(x => x.language.name === 'en')?.flavor_text ?? ''
        const weightKg = (detail.weight / 10).toFixed(1)
        const heightM = (detail.height / 10).toFixed(1)
        const types = detail.types.map(t => t.type.name)
        const img = detail.sprites.front_default
        if (active) {
          setData({
            id: detail.id,
            name: detail.name,
            types,
            img,
            weightKg,
            heightM,
            description: desc.replace(/\s+/g, ' ').trim()
          })
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    run()
    return () => { active = false }
  }, [name])

  if (loading || !data) return <Loader />

  return (
    <main className="pokedex-wrap">
      <button className="min" onClick={() => navigate('/grid')}>Back</button>
      <section className="pokedex-card">
        <div className="pokedex-header">
          <h1 className="pokedex-title">#{data.id} {data.name}</h1>
          <div className="pokedex-types">{data.types.join(' / ')}</div>
        </div>
        <img className="pokedex-img" src={data.img ?? ''} alt={data.name} />
        <div className="pokedex-meta">
          <div>WT: {data.weightKg} kg</div>
          <div>HT: {data.heightM} m</div>
        </div>
        <p className="pokedex-desc">{data.description || 'No description available.'}</p>
      </section>
    </main>
  )
}
