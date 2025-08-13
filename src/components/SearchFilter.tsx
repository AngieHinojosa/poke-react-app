type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};
export default function SearchFilter({ value, onChange, placeholder = "Search Pokemón by name" }: Props) {
  return (
    <input
      className="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search Pokémon by name"
      type="search"
    />
  );
}
