import { Link } from 'react-router-dom'

export default function Erreur() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      color: '#e8e6e1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      gap: '1.2rem',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(232,230,225,0.35)' }}>
        Erreur 404
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 600, lineHeight: 1.1 }}>
        Page{' '}
        <span style={{ color: 'transparent', WebkitTextStroke: '2px rgba(232,230,225,0.85)' }}>
          introuvable
        </span>
      </h1>
      <p style={{ color: 'rgba(232,230,225,0.45)', fontSize: '0.9rem', maxWidth: '360px' }}>
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        style={{
          marginTop: '1rem',
          padding: '0.75rem 2rem',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px',
          color: '#e8e6e1',
          textDecoration: 'none',
          fontSize: '0.82rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        ← Retour à l'accueil
      </Link>
    </div>
  )
}
