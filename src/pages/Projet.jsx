import { useState, useEffect } from 'react'
import { FiGithub, FiCode, FiStar, FiGitBranch } from 'react-icons/fi'
import { GiSwordClash, GiMonsterGrasp } from 'react-icons/gi'
import { MdShoppingCart } from 'react-icons/md'
import './Projet.css'

const projetIcons = {
  'Edo': <GiSwordClash />,
  'Projet_pokedex': <GiMonsterGrasp />,
  'liste-courses': <MdShoppingCart />
}

const langageColors = {
  'JavaScript': '#F7DF1E',
  'CSS': '#264DE4',
  'HTML': '#E34F26',
  'Python': '#3572A5',
  'React': '#61DAFB'
}

export default function Projet() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    fetch("https://api.github.com/users/Sino-lab/repos?per_page=30&sort=updated")
      .then(res => res.json())
      .then(data => {
        setRepos(data)
        setLoading(false)
      })
      .catch(err => {
        setErreur("Erreur de chargement")
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="loading">Chargement...</div>
  if (erreur) return <div className="erreur">{erreur}</div>

  return (
    <div className="projets-page">
      <div className="projets-header">
        <p className="projets-eyebrow">Portfolio</p>
        <h1 className="projets-titre">Mes <span>Projets</span></h1>
      </div>
      <div className="grille">
        {repos.map(repo => (
          <div className="carte" key={repo.id}>
            <div className="carte-top">
              <span className="carte-icon">
                {projetIcons[repo.name] || <FiCode />}
              </span>
              <h3>{repo.name}</h3>
            </div>
            <p>{repo.description || "Pas de description"}</p>
            <div className="carte-stats">
              <span><FiStar /> {repo.stargazers_count}</span>
              <span><FiGitBranch /> {repo.forks_count}</span>
            </div>
            <div className="carte-footer">
              <span
                className="carte-lang"
                style={{ color: langageColors[repo.language] || 'rgba(232,230,225,0.35)' }}
              >
                ● {repo.language || "N/A"}
              </span>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                <FiGithub /> GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}