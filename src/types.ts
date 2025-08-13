export type PokemonListItem = { name: string; url: string }
export type PokemonListResponse = { count: number; results: PokemonListItem[] }

export type PokemonDetail = {
  id: number
  name: string
  height: number
  weight: number
  sprites: { front_default: string | null }
  types: { type: { name: string } }[]
}

export type PokemonSpecies = {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[]
}
