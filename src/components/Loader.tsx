export default function Loader() {
  return (
    <div style={{ padding: 28, textAlign: 'center' }}>
      <div style={{
        width: 26, height: 26, margin: '0 auto 10px',
        borderRadius: '50%',
        border: '3px solid #ffffff22',
        borderTopColor: 'var(--primary)',
        animation: 'spin 0.9s linear infinite'
      }} />
      <div className="muted">Loading…</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}
