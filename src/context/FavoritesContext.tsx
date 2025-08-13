import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'

type State = { ids: string[] }
type Action = { type: 'toggle'; id: string } | { type: 'load'; ids: string[] }

function reducer(state: State, action: Action): State {
  if (action.type === 'toggle') {
    const exists = state.ids.includes(action.id)
    return { ids: exists ? state.ids.filter(x => x !== action.id) : [...state.ids, action.id] }
  }
  if (action.type === 'load') return { ids: action.ids }
  return state
}

type Ctx = { favorites: string[]; toggleFavorite: (id: string) => void }
const FavoritesContext = createContext<Ctx | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { ids: [] })

  useEffect(() => {
    const raw = localStorage.getItem('favorites')
    if (raw) dispatch({ type: 'load', ids: JSON.parse(raw) })
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(state.ids))
  }, [state.ids])

  const value = useMemo(() => ({
    favorites: state.ids,
    toggleFavorite: (id: string) => dispatch({ type: 'toggle', id })
  }), [state.ids])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('FavoritesContext missing')
  return ctx
}
