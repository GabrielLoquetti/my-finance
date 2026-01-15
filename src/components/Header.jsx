import { useAuth } from '../context/AuthContext'
import { useFinance } from '../context/FinanceContext'
import { LogOut, Calendar, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Header({ onMenuClick }) {
  const { logout } = useAuth()
  const { selectedYear, setSelectedYear } = useFinance()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const years = [2024, 2025, 2026, 2027, 2028]

  return (
    <header className="header">
      <div className="header-content">
        <button className="menu-button" onClick={onMenuClick}>
          <Menu size={24} />
        </button>

        <div className="header-left">
          <h1 className="header-title">MyFinance</h1>
          <p className="header-subtitle">Gestão Financeira</p>
        </div>

        <div className="header-right">
          <div className="year-selector">
            <Calendar size={20} />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="year-select"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
