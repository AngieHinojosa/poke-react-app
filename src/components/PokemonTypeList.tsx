type Props = { types: string[] };

export default function PokemonTypeList({ types }: Props) {
  if (!types?.length) return null;
  return (
    <div className="pokedex-types">
      {types.map((t) => (
        <span key={t} className="badge" style={{ textTransform: "capitalize" }}>
          {t}
        </span>
      ))}
    </div>
  );
}
