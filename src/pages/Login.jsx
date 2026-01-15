import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, User, AlertCircle, TrendingUp } from 'lucide-react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = login(username, password)

      if (result.success) {
        navigate('/')
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page-new">
      {/* Lado esquerdo - Branding (apenas desktop) */}
      <div className="login-brand">
        <div className="brand-content">
          <div className="brand-icon">
            <TrendingUp size={48} />
          </div>
          <h1 className="brand-title">MyFinance</h1>
          <p className="brand-tagline">Controle total das suas finanças</p>

          <div className="brand-features">
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <span>Organize receitas e despesas</span>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <span>Planejamento financeiro 50/30/20</span>
            </div>
            <div className="feature-item">
              <div className="feature-check">✓</div>
              <span>Dados seguros e criptografados</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="login-form-section">
        <div className="login-form-container">
          {/* Logo mobile */}
          <div className="mobile-brand">
            <div className="mobile-icon">
              <TrendingUp size={32} />
            </div>
            <h2>MyFinance</h2>
          </div>

          <div className="login-welcome">
            <h3>Bem-vindo de volta</h3>
            <p>Entre para gerenciar suas finanças</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form-new">
            <div className="input-wrapper">
              <div className="input-icon">
                <User size={20} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuário"
                required
                autoComplete="username"
                disabled={loading}
                className="input-modern"
              />
            </div>

            <div className="input-wrapper">
              <div className="input-icon">
                <Lock size={20} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                required
                autoComplete="current-password"
                disabled={loading}
                className="input-modern"
              />
            </div>

            {error && (
              <div className="error-banner">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="btn-login-new" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="login-hint">
              <div className="hint-label">Credenciais padrão</div>
              <div className="hint-values">
                <span><strong>Usuário:</strong> myfinance</span>
                <span><strong>Senha:</strong> finance1234</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
