import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar, Target, X } from 'lucide-react'
import { MESES } from '../context/FinanceContext'

function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">MyFinance</span>
        </div>
        <button className="sidebar-close" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          onClick={onClose}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/planning"
          onClick={onClose}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <Target size={20} />
          <span>Planejamento</span>
        </NavLink>

        <div className="nav-section">
          <div className="nav-section-title">
            <Calendar size={16} />
            <span>Meses</span>
          </div>

          <div className="months-list">
            {MESES.map((mes, index) => (
              <NavLink
                key={index}
                to={`/month/${index}`}
                onClick={onClose}
                className={({ isActive }) => `nav-item month-item ${isActive ? 'active' : ''}`}
              >
                <span>{mes}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar
