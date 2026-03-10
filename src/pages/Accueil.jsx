import './Accueil.css'

export default function Accueil() {
  const competences = [
    {
      icon: "🪟",
      titre: "Environnement Windows",
      items: ["DHCP : plages IP dynamiques, réservations, dépannage", "AD DS : comptes, GPO, réplication, intégration domaine", "DNS : zones, transfert, réplication"]
    },
    {
      icon: "🐧",
      titre: "Linux Ubuntu / Debian",
      items: ["Administration : utilisateurs, permissions, processus", "Réseau : SSH, DNS, ping", "Services : Apache, DHCP, DNS, apt/yum"]
    },
    {
      icon: "💾",
      titre: "Sauvegarde",
      items: ["Veeam Backup & Windows Backup", "Stratégies complète / incrémentielle / différentielle", "Automatisation quotidienne et hebdomadaire"]
    },
    {
      icon: "🔀",
      titre: "Switching Cisco / Aruba",
      items: ["Configuration VLAN et adresses IP", "Ports accès et trunk"]
    },
    {
      icon: "🖥️",
      titre: "Virtualisation VMware / HyperV",
      items: ["Création et déploiement de VMs", "Switchs virtuels, VLANs", "Clonage, sauvegarde, restauration"]
    },
    {
      icon: "🔥",
      titre: "Pare-feu Stormshield / PfSense",
      items: ["Règles NAT, filtrage IP et ports", "Analyse logs et gestion d'incidents"]
    },
    {
      icon: "📋",
      titre: "Gestion de projet",
      items: ["Trello, Office 365, Google Workspace", "Gantt, planning, reporting", "Documentation Word / Excel / PowerPoint"]
    }
  ]

  return (
    <div className="accueil">
      <p className="accueil-titre">Portfolio</p>
      <h1 className="accueil-heading">Mes <span>Compétences</span></h1>
      <div className="grille">
        {competences.map((c) => (
          <div className="carte" key={c.titre}>
            <div className="carte-icon">{c.icon}</div>
            <div className="carte-titre">{c.titre}</div>
            <ul className="carte-items">
              {c.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}