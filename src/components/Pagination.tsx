type Props = { page: number; totalPages: number; onChange: (p: number) => void }

export default function Pagination({ page, totalPages, onChange }: Props) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', padding: 16 }}>
      <button disabled={page <= 1} onClick={() => onChange(page - 1)}>Prev</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Next</button>
    </div>
  )
}
