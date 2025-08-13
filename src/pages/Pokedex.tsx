import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPokemonDetail, getPokemonSpecies } from '../api/pokeapi'
import { PokemonDetail } from '../types'
import Loader from '../components/Loader'
import PokemonTypeList from '../components/PokemonTypeList'
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
      <section className="retro-card">
        <div className="retro-head">
          <span className="rid">{String(data.id).padStart(3,'0')}</span>
          <span className="rname">{data.name}</span>
        </div>
        <div className="retro-body">
          <div className="dial" />
          <img className="sprite" src={data.img ?? ''} alt={data.name} />
        </div>
        <div className="pokedex-types">
          <PokemonTypeList types={data.types} />
        </div>
        <div className="retro-specs">
          <div>WT <strong>{data.weightKg} kg</strong></div>
          <div>HT <strong>{data.heightM} m</strong></div>
        </div>
        <p className="retro-desc">{data.description || 'No description available.'}</p>
      </section>
    </main>
  )
}
