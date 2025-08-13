import { useEffect, useMemo, useState } from 'react'
import '../styles/grid.css'
import Loader from '../components/Loader'
import PokemonCard from '../components/PokemonCard'
import { useFavorites } from '../context/FavoritesContext'
import Pagination from '../components/Pagination'
import * as realApi from '../api/pokeapi'
import { PokemonDetail } from '../types'

type Card = { id: number; name: string; sprite: string | null }
const PAGE_SIZE = 30

type Api = {
  getPokemonPage: (limit: number, offset: number) => Promise<{ count: number; results: { name: string; url: string }[] }>
  getPokemonDetail: (name: string) => Promise<PokemonDetail>
}

const defaultApi: Api = {
  getPokemonPage: realApi.getPokemonPage,
  getPokemonDetail: realApi.getPokemonDetail
}

export default function PokeGrid({ api = defaultApi }: { api?: Api }) {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [onlyFavs, setOnlyFavs] = useState(false)
  const { favorites } = useFavorites()
  const [items, setItems] = useState<Card[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    let active = true
    setLoading(true)
    const offset = (page - 1) * PAGE_SIZE
    api.getPokemonPage(PAGE_SIZE, offset)
      .then(async list => {
        if (!active) return
        const pages = Math.ceil(list.count / PAGE_SIZE)
        setTotalPages(pages)
        const details: PokemonDetail[] = await Promise.all(
          list.results.map(x => api.getPokemonDetail(x.name))
        )
        const mapped: Card[] = details.map(d => ({
          id: d.id,
          name: d.name,
          sprite: d.sprites.front_default
        }))
        if (active) setItems(mapped)
      })
      .catch(() => { if (active) setItems([]) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [page, api])

  const filtered = useMemo(() => {
    const byName = items.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    if (!onlyFavs) return byName
    const fav = new Set(favorites)
    return byName.filter(x => fav.has(String(x.id)))
  }, [items, query, onlyFavs, favorites])

  return (
    <main className="grid-wrap">
      <section className="grid-toolbar">
        <input
          className="search"
          placeholder="Search by name"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="min" onClick={() => setOnlyFavs(v => !v)}>{onlyFavs ? 'All' : 'Only favorites'}</button>
      </section>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid">
            {filtered.map(p => (
              <PokemonCard key={p.id} id={p.id} name={p.name} sprite={p.sprite} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </main>
  )
}
