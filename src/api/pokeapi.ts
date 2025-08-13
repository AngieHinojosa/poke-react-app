import { PokemonDetail, PokemonListResponse, PokemonSpecies } from '../types'
const BASE = 'https://pokeapi.co/api/v2'

export async function getPokemonPage(limit: number, offset: number): Promise<PokemonListResponse> {
    const r = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`)
    if (!r.ok) throw new Error('Failed to fetch list')
    return r.json()
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
    const r = await fetch(`${BASE}/pokemon/${name}`)
    if (!r.ok) throw new Error('Failed to fetch detail')
    return r.json()
}

export async function getPokemonSpecies(id: number): Promise<PokemonSpecies> {
    const r = await fetch(`${BASE}/pokemon-species/${id}`)
    if (!r.ok) throw new Error('Failed to fetch species')
    return r.json()
}
