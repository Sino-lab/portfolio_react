import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({
    prenom: '', nom: '', email: '', sujet: '', message: ''
  })
  const [erreurs, setErreurs] = useState({})
  const [loading, setLoading] = useState(false)
  const [succes, setSucces] = useState(false)
  const [erreurReseau, setErreurReseau] = useState(null)

  const valider = () => {
    const e = {}
    if (!form.prenom.trim()) e.prenom = 'Le prénom est requis'
    if (!form.nom.trim()) e.nom = 'Le nom est requis'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Email invalide'
    if (!form.sujet) e.sujet = 'Veuillez choisir un sujet'
    if (form.message.length < 20) e.message = 'Message trop court (minimum 20 caractères)'
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErreurs({ ...erreurs, [e.target.name]: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const e2 = valider()
    if (Object.keys(e2).length > 0) return setErreurs(e2)

    setLoading(true)
    setErreurReseau(null)

    try {
      const res = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        setSucces(true)
        setForm({ prenom: '', nom: '', email: '', sujet: '', message: '' })
      } else {
        setErreurReseau("Erreur lors de l'envoi. Réessayez.")
      }
    } catch {
      setErreurReseau("Erreur réseau. Vérifiez votre connexion.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <p className="contact-eyebrow">Contact</p>
        <h1 className="contact-titre">Me <span>Contacter</span></h1>
      </div>

      {succes && (
        <div className="toast-succes">
          ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
        </div>
      )}

      {erreurReseau && (
        <div className="toast-erreur">
          ❌ {erreurReseau}
          <button onClick={() => setErreurReseau(null)}>Réessayer</button>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              onChange={handleChange}
              placeholder="Alexandre"
              className={erreurs.prenom ? 'input-erreur' : ''}
            />
            {erreurs.prenom && <span className="erreur-msg">{erreurs.prenom}</span>}
          </div>

          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              onChange={handleChange}
              placeholder="Constan"
              className={erreurs.nom ? 'input-erreur' : ''}
            />
            {erreurs.nom && <span className="erreur-msg">{erreurs.nom}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="alexandre@email.com"
            className={erreurs.email ? 'input-erreur' : ''}
          />
          {erreurs.email && <span className="erreur-msg">{erreurs.email}</span>}
        </div>

        <div className="form-group">
          <label>Sujet</label>
          <select
            name="sujet"
            value={form.sujet}
            onChange={handleChange}
            className={erreurs.sujet ? 'input-erreur' : ''}
          >
            <option value="">Choisir un sujet</option>
            <option value="Opportunité">Opportunité</option>
            <option value="Question">Question</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Autre">Autre</option>
          </select>
          {erreurs.sujet && <span className="erreur-msg">{erreurs.sujet}</span>}
        </div>

        <div className="form-group">
          <label>Message <span className="label-hint">({form.message.length}/20 min)</span></label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Votre message..."
            rows={6}
            className={erreurs.message ? 'input-erreur' : ''}
          />
          {erreurs.message && <span className="erreur-msg">{erreurs.message}</span>}
        </div>

        <button type="submit" className="contact-btn" disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Envoyer le message →'}
        </button>
      </form>
    </div>
  )
}