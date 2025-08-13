import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from '../pages/Landing'
import PokeGrid from '../pages/PokeGrid'
import Pokedex from '../pages/Pokedex'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/grid" element={<PokeGrid />} />
      <Route path="/pokedex/:name" element={<Pokedex />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
