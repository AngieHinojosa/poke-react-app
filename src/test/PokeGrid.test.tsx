import { render, screen, waitFor, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PokeGrid from '../pages/PokeGrid'
import { FavoritesProvider } from '../context/FavoritesContext'
import { test, expect } from 'vitest'

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <MemoryRouter>
      <FavoritesProvider>{ui}</FavoritesProvider>
    </MemoryRouter>
  )
}

const api = {
  getPokemonPage: async () => ({
    count: 60,
    results: [
      { name: 'pikachu', url: '' },
      { name: 'bulbasaur', url: '' },
      { name: 'gengar', url: '' }
    ]
  }),
  getPokemonDetail: async (name: string) => ({
    id: name === 'pikachu' ? 25 : name === 'bulbasaur' ? 1 : 94,
    name,
    height: 10,
    weight: 60,
    sprites: { front_default: null },
    types: []
  })
}

test('renders, filters by name, toggles and filters favorites', async () => {
  renderWithProviders(<PokeGrid api={api} />)

  expect(screen.getByText(/Loading/i)).toBeInTheDocument()

  await waitFor(() => {
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument()
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    expect(screen.getByText(/gengar/i)).toBeInTheDocument()
  })

  fireEvent.change(screen.getByPlaceholderText(/Search by name/i), { target: { value: 'bulb' } })
  expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/gengar/i)).not.toBeInTheDocument()
  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()

  const titleEl = screen.getByText(/bulbasaur/i)
  const cardEl = titleEl.closest('.retro-tile') || titleEl.closest('.card')
  if (!cardEl || !(cardEl instanceof HTMLElement)) {
    throw new Error('Card element not found or not an HTMLElement')
  }

  const favBtn = within(cardEl).getByRole('button', { name: /add to favorites/i })
  fireEvent.click(favBtn)

  fireEvent.click(screen.getByRole('button', { name: /^Only favorites$/i }))
  await screen.findByRole('button', { name: /^All$/i })

  expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
})
