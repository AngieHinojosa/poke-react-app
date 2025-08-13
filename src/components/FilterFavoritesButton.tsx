type Props = { onlyFavs: boolean; onToggle: () => void };

export default function FilterFavoritesButton({ onlyFavs, onToggle }: Props) {
  return (
    <button className="min" onClick={onToggle}>
      {onlyFavs ? "All" : "Only favorites"}
    </button>
  );
}
