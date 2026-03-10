import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil.jsx'
import Apropos from './pages/Apropos.jsx'
import Contact from './pages/Contact.jsx'
import Projet from './pages/Projet.jsx'
import Erreur from './pages/Erreur.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/projets" element={<Projet />} />
        <Route path="/apropos" element={<Apropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App