import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Accueil", path: "/" },
    { label: "Projets", path: "/projets" },
    { label: "À propos", path: "/apropos" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Bebas+Neue&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #080808; color: #e8e6e1; font-family: 'Inter', sans-serif; }
        .nav {
          position: fixed; top: 0; left: 0;
          width: 100%; z-index: 100;
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 0 3rem; height: 64px;
          transition: background 0.4s ease, border-color 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .nav.scrolled {
          background: rgba(8,8,8,0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .nav-logo {
          font-family: 'Inter', sans-serif;
          font-weight: 600; font-size: 0.95rem;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #e8e6e1; text-decoration: none;
        }
        .nav-links { display: flex; list-style: none; gap: 2.5rem; align-items: center; }
        .nav-links a {
          font-size: 0.78rem; font-weight: 400;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(232,230,225,0.5); text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-links a:hover { color: #e8e6e1; }
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; background: none; border: none; padding: 4px;
        }
        .nav-burger span {
          display: block; width: 20px; height: 1px;
          background: #e8e6e1; transition: all 0.3s ease;
        }
        .nav-burger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
        .nav-burger.open span:nth-child(2) { opacity: 0; }
        .nav-burger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }
        .nav-mobile {
          position: fixed; inset: 0; background: #080808; z-index: 99;
          display: flex; flex-direction: column;
          justify-content: center; align-items: center; gap: 2.5rem;
          opacity: 0; pointer-events: none; transition: opacity 0.35s ease;
        }
        .nav-mobile.open { opacity: 1; pointer-events: all; }
        .nav-mobile a {
          font-family: 'Bebas Neue', sans-serif; font-size: 3.5rem;
          letter-spacing: 0.08em; color: rgba(232,230,225,0.35);
          text-decoration: none; transition: color 0.2s ease;
        }
        .nav-mobile a:hover { color: #e8e6e1; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .nav-burger { display: flex; }
          .nav { padding: 0 1.5rem; }
        }
      `}</style>

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <NavLink to="/" className="nav-logo">A. Constan</NavLink>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.label}>
              <NavLink to={l.path}>{l.label}</NavLink>
            </li>
          ))}
        </ul>

        <button
          className={`nav-burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {links.map((l) => (
          <NavLink key={l.label} to={l.path} onClick={() => setMenuOpen(false)}>
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}