import { FiDownload, FiMapPin, FiBriefcase, FiHeart } from 'react-icons/fi'
import './Apropos.css'

export default function Apropos() {
  return (
    <div className="apropos-page">
      <div className="apropos-header">
        <p className="apropos-eyebrow">À propos</p>
        <h1 className="apropos-titre">Alexandre <span>Constan</span></h1>
      </div>

      <div className="apropos-grid">
        <div className="apropos-bio">
          <div className="bio-card">
            <div className="bio-icon" style={{color: '#4FC3F7'}}><FiBriefcase /></div>
            <div>
              <h3>Reconversion réussie</h3>
              <p>Après plusieurs années en tant que responsable de restaurant, j'ai choisi de suivre ma vraie vocation. À 29 ans, j'ai opéré une reconversion vers la cybersécurité — un domaine qui me correspond pleinement.</p>
            </div>
          </div>

          <div className="bio-card">
            <div className="bio-icon" style={{color: '#F06292'}}><FiHeart /></div>
            <div>
              <h3>Ma passion</h3>
              <p>Passionné par la technologie depuis toujours, je construis chaque jour de nouvelles compétences techniques tout en apportant une vision différente : celle d'un professionnel qui sait gérer la pression, manager une équipe et prendre des décisions rapides.</p>
            </div>
          </div>

          <div className="bio-card">
            <div className="bio-icon" style={{color: '#81C784'}}><FiMapPin /></div>
            <div>
              <h3>Aujourd'hui</h3>
              <p>Alternant en cybersécurité, je combine mes expériences passées avec mes nouvelles compétences techniques pour construire une carrière solide dans la sécurité informatique.</p>
            </div>
          </div>
        </div>

        <div className="apropos-side">
          <div className="side-card">
            <div className="side-stat">
              <span className="stat-num">29</span>
              <span className="stat-label">Ans</span>
            </div>
            <div className="side-stat">
              <span className="stat-num">2+</span>
              <span className="stat-label">Ans en IT</span>
            </div>
            <div className="side-stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Ans de management</span>
            </div>
          </div>

          <a href="/cv.pdf" target="_blank" className="cv-btn">
            <FiDownload /> Télécharger mon CV
          </a>
        </div>
      </div>
    </div>
  )
}