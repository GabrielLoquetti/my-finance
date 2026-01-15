import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Calendar } from 'lucide-react'
import { MESES } from '../context/FinanceContext'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">💰</div>
          <span className="logo-text">MyFinance</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
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
