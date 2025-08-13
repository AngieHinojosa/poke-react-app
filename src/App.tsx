import AppRoutes from './routes/AppRoutes'
import { FavoritesProvider } from './context/FavoritesContext'

export default function App() {
  return (
    <FavoritesProvider>
      <AppRoutes />
    </FavoritesProvider>
  )
}
