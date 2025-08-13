type Props = { isFav: boolean; onToggle: () => void };

export default function FavoritesButton({ isFav, onToggle }: Props) {
  return (
    <button
      className={`heart ${isFav ? "fav" : ""}`}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      title={isFav ? "Unfavorite" : "Favorite"}
    >
      {isFav ? "♥" : "♡"}
    </button>
  );
}
