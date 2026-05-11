import { NavLink } from 'react-router-dom'
import { FiGithub, FiMail } from 'react-icons/fi'
import { FaLinkedin } from 'react-icons/fa'
import QRCodeContact from './QRCodeContact'
import './Footer.css'

const links = [
  { label: 'Accueil', path: '/' },
  { label: 'Projets', path: '/projets' },
  { label: 'À propos', path: '/apropos' },
  { label: 'Contact', path: '/contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <p className="footer-name">A. Constan</p>
          <p className="footer-sub">Développeur Front-End React</p>
          <nav className="footer-links">
            {links.map(l => (
              <NavLink key={l.path} to={l.path}>{l.label}</NavLink>
            ))}
          </nav>
          <div className="footer-socials">
            <a href="https://github.com/Sino-lab" target="_blank" rel="noreferrer" aria-label="GitHub">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/alexandre-constan-2b194624a/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="mailto:alexandre.bconstan@gmail.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="footer-qr">
          <QRCodeContact />
          <p className="footer-qr-label">Scannez pour enregistrer mon contact</p>
          <a href="/contact.vcf" download className="footer-vcf-btn">
            Télécharger la vCard
          </a>
        </div>
      </div>

      <p className="footer-copy">© 2025 Alexandre Constan — Tous droits réservés</p>
    </footer>
  )
}
