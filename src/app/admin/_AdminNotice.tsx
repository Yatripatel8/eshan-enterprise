export default function AdminNotice() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'var(--font-inter, sans-serif)',
    }}>
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: '#1e293b' }}>
          Admin Panel Unavailable
        </h1>
        <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          This is a static website exported for Hostinger shared hosting. The admin panel
          requires a Node.js server and cannot run here.
        </p>
        <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
          To manage products and categories, run the application locally or deploy it on a
          Node.js-capable host (e.g. VPS, Railway, Render, Vercel).
        </p>
        <div style={{
          background: '#f1f5f9',
          borderRadius: 8,
          padding: '1rem 1.5rem',
          fontSize: '0.875rem',
          color: '#475569',
          textAlign: 'left',
        }}>
          <strong>Run locally:</strong>
          <pre style={{ margin: '0.5rem 0 0', fontFamily: 'monospace' }}>
            npm install{'\n'}npm run dev
          </pre>
        </div>
      </div>
    </div>
  );
}
