import { useState, useEffect } from 'react'
import { FiGithub, FiCode, FiStar, FiExternalLink, FiRefreshCw } from 'react-icons/fi'
import projectsData from '../data/projects.json'
import './Projet.css'

const langageColors = {
  'JavaScript': '#F7DF1E',
  'CSS': '#264DE4',
  'HTML': '#E34F26',
  'Python': '#3572A5',
  'TypeScript': '#3178C6',
  'React': '#61DAFB',
  'Figma': '#F24E1E',
  'Chart.js': '#FF6384'
}

function normalizeGithub(repo) {
  return {
    id: `gh-${repo.id}`,
    name: repo.name,
    title: repo.name,
    description: repo.description || 'Pas de description',
    techs: repo.language ? [repo.language] : [],
    type: 'GitHub',
    githubUrl: repo.html_url,
    liveUrl: null,
    updatedAt: repo.updated_at,
    stars: repo.stargazers_count,
    source: 'github'
  }
}

function normalizeJson(proj) {
  return {
    id: proj.id,
    name: proj.title,
    title: proj.title,
    description: proj.description,
    techs: proj.techs || [],
    type: proj.type || 'Autre',
    githubUrl: null,
    liveUrl: proj.liveUrl || null,
    updatedAt: null,
    stars: 0,
    source: 'json'
  }
}

function mergeProjects(githubRepos, jsonProjects) {
  const map = new Map()
  githubRepos.forEach(r => map.set(r.name.toLowerCase(), normalizeGithub(r)))
  jsonProjects.forEach(p => {
    const normalized = normalizeJson(p)
    map.set(normalized.name.toLowerCase(), normalized)
  })
  return Array.from(map.values())
}

export default function Projet() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState(null)
  const [search, setSearch] = useState('')
  const [categorie, setCategorie] = useState('Tous')
  const [tri, setTri] = useState('recent')

  const fetchRepos = () => {
    setLoading(true)
    setErreur(null)
    fetch('https://api.github.com/users/Sino-lab/repos?per_page=30&sort=updated')
      .then(res => {
        if (!res.ok) throw new Error()
        return res.json()
      })
      .then(data => {
        setRepos(mergeProjects(data, projectsData))
        setLoading(false)
      })
      .catch(() => {
        setErreur('Impossible de charger les projets GitHub')
        setLoading(false)
      })
  }

  useEffect(() => { fetchRepos() }, [])

  const categories = ['Tous', ...new Set(repos.map(r => r.type).filter(Boolean))]

  const filtered = repos
    .filter(r => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        r.title.toLowerCase().includes(q) ||
        r.techs.join(' ').toLowerCase().includes(q)
      const matchCat = categorie === 'Tous' || r.type === categorie
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (tri === 'alpha') return a.title.localeCompare(b.title)
      if (!a.updatedAt) return 1
      if (!b.updatedAt) return -1
      return new Date(b.updatedAt) - new Date(a.updatedAt)
    })

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Chargement des projets...
    </div>
  )

  if (erreur) return (
    <div className="erreur">
      <p>{erreur}</p>
      <button className="retry-btn" onClick={fetchRepos}>
        <FiRefreshCw /> Réessayer
      </button>
    </div>
  )

  return (
    <div className="projets-page">
      <div className="projets-header">
        <p className="projets-eyebrow">Portfolio</p>
        <h1 className="projets-titre">Mes <span>Projets</span></h1>
      </div>

      <div className="projets-controls">
        <input
          className="search-bar"
          type="text"
          placeholder="Rechercher un projet ou une technologie..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="controls-row">
          <div className="categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${categorie === cat ? 'active' : ''}`}
                onClick={() => setCategorie(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            className="tri-select"
            value={tri}
            onChange={e => setTri(e.target.value)}
          >
            <option value="recent">Plus récents</option>
            <option value="alpha">Alphabétique</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="vide">Aucun projet ne correspond à votre recherche.</p>
      ) : (
        <div className="grille">
          {filtered.map(projet => (
            <div className="carte" key={projet.id}>
              <div className="carte-top">
                <span className="carte-icon"><FiCode /></span>
                <div>
                  <h3>{projet.title}</h3>
                  <span className="carte-type">{projet.type}</span>
                </div>
              </div>

              <p>{projet.description}</p>

              <div className="carte-techs">
                {projet.techs.map(t => (
                  <span
                    key={t}
                    className="badge-tech"
                    style={{ color: langageColors[t] || 'rgba(232,230,225,0.5)' }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {projet.source === 'github' && (
                <div className="carte-stats">
                  <span><FiStar /> {projet.stars}</span>
                </div>
              )}

              <div className="carte-footer">
                <span className="carte-date">
                  {projet.updatedAt
                    ? new Date(projet.updatedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' })
                    : ''}
                </span>
                <div className="carte-links">
                  {projet.liveUrl && (
                    <a href={projet.liveUrl} target="_blank" rel="noreferrer">
                      <FiExternalLink /> Live
                    </a>
                  )}
                  {projet.githubUrl && (
                    <a href={projet.githubUrl} target="_blank" rel="noreferrer">
                      <FiGithub /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
