import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFinance, MESES } from '../context/FinanceContext'
import { formatCurrency } from '../utils/formatters'
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Sparkles
} from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const { calcularTotal, calcularSaldoAcumulado, selectedYear } = useFinance()
  const [isMobile] = useState(window.innerWidth <= 768)

  const calcularTotaisAno = () => {
    let totalReceitas = 0
    let totalDespesas = 0

    MESES.forEach((_, index) => {
      totalReceitas += calcularTotal(index, 'receitas')
      totalDespesas += calcularTotal(index, 'despesasFixas') + calcularTotal(index, 'despesasVariaveis')
    })

    const saldoFinal = calcularSaldoAcumulado(11)

    return { totalReceitas, totalDespesas, saldoFinal }
  }

  const { totalReceitas, totalDespesas, saldoFinal } = calcularTotaisAno()

  // Dados por mês para o grid
  const getMesResumo = (index) => {
    const receitas = calcularTotal(index, 'receitas')
    const despesas = calcularTotal(index, 'despesasFixas') + calcularTotal(index, 'despesasVariaveis')
    const saldo = receitas - despesas
    return { receitas, despesas, saldo }
  }

  const mesAtual = new Date().getMonth()

  // Mobile - Design minimalista
  if (isMobile) {
    return (
      <div className="mobile-dashboard">
        {/* Hero minimalista */}
        <div className="mobile-hero">
          <div className="mobile-hero-balance">
            <span className="mobile-hero-label">Saldo {selectedYear}</span>
            <span className={`mobile-hero-value ${saldoFinal >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(saldoFinal)}
            </span>
          </div>

          <div className="mobile-hero-stats">
            <div className="mobile-stat">
              <TrendingUp size={16} className="stat-icon positive" />
              <span>{formatCurrency(totalReceitas)}</span>
            </div>
            <div className="mobile-stat">
              <TrendingDown size={16} className="stat-icon negative" />
              <span>{formatCurrency(totalDespesas)}</span>
            </div>
          </div>
        </div>

        {/* Grid de meses */}
        <div className="mobile-months-section">
          <h3 className="mobile-section-title">Meses</h3>
          <div className="mobile-months-grid">
            {MESES.map((mes, index) => {
              const { saldo } = getMesResumo(index)
              const isCurrentMonth = index === mesAtual
              const hasData = saldo !== 0

              return (
                <button
                  key={index}
                  className={`mobile-month-card ${isCurrentMonth ? 'current' : ''} ${hasData ? 'has-data' : ''}`}
                  onClick={() => navigate(`/month/${index}`)}
                >
                  <span className="month-abbrev">{mes.slice(0, 3)}</span>
                  {hasData && (
                    <span className={`month-indicator ${saldo >= 0 ? 'positive' : 'negative'}`} />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Lista rápida dos últimos meses com dados */}
        <div className="mobile-recent-section">
          <h3 className="mobile-section-title">Resumo Recente</h3>
          {MESES.slice(0, mesAtual + 1).reverse().slice(0, 4).map((mes, idx) => {
            const realIndex = mesAtual - idx
            const { receitas, despesas, saldo } = getMesResumo(realIndex)
            if (receitas === 0 && despesas === 0) return null

            return (
              <button
                key={realIndex}
                className="mobile-recent-item"
                onClick={() => navigate(`/month/${realIndex}`)}
              >
                <div className="recent-info">
                  <span className="recent-month">{mes}</span>
                  <span className={`recent-saldo ${saldo >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(saldo)}
                  </span>
                </div>
                <ChevronRight size={20} className="recent-arrow" />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Desktop - Design moderno e inovador
  return (
    <div className="desktop-dashboard">
      {/* Header com gradiente */}
      <div className="dashboard-header-card">
        <div className="header-card-content">
          <div className="header-card-left">
            <div className="header-badge">
              <Sparkles size={14} />
              <span>Visão Geral</span>
            </div>
            <h1 className="header-card-title">{selectedYear}</h1>
            <p className="header-card-subtitle">Acompanhe suas finanças de forma inteligente</p>
          </div>
          <div className="header-card-right">
            <div className="header-balance">
              <span className="balance-label">Saldo Acumulado</span>
              <span className={`balance-value ${saldoFinal >= 0 ? 'positive' : 'negative'}`}>
                {formatCurrency(saldoFinal)}
              </span>
            </div>
          </div>
        </div>

        <div className="header-stats-row">
          <div className="header-stat">
            <div className="stat-icon-wrapper positive">
              <TrendingUp size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Receitas</span>
              <span className="stat-value positive">{formatCurrency(totalReceitas)}</span>
            </div>
          </div>
          <div className="header-stat">
            <div className="stat-icon-wrapper negative">
              <TrendingDown size={20} />
            </div>
            <div className="stat-content">
              <span className="stat-label">Despesas</span>
              <span className="stat-value negative">{formatCurrency(totalDespesas)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de meses estilo calendário */}
      <div className="months-calendar-section">
        <h2 className="section-heading">Navegação por Mês</h2>
        <div className="months-calendar-grid">
          {MESES.map((mes, index) => {
            const { receitas, despesas, saldo } = getMesResumo(index)
            const isCurrentMonth = index === mesAtual
            const hasData = receitas > 0 || despesas > 0

            return (
              <button
                key={index}
                className={`month-calendar-card ${isCurrentMonth ? 'current' : ''} ${hasData ? 'has-data' : ''}`}
                onClick={() => navigate(`/month/${index}`)}
              >
                <div className="month-card-header">
                  <span className="month-card-name">{mes}</span>
                  {isCurrentMonth && <span className="current-badge">Atual</span>}
                </div>

                {hasData ? (
                  <div className="month-card-stats">
                    <div className="month-mini-stat">
                      <TrendingUp size={12} className="mini-icon positive" />
                      <span>{formatCurrency(receitas)}</span>
                    </div>
                    <div className="month-mini-stat">
                      <TrendingDown size={12} className="mini-icon negative" />
                      <span>{formatCurrency(despesas)}</span>
                    </div>
                    <div className={`month-saldo ${saldo >= 0 ? 'positive' : 'negative'}`}>
                      {formatCurrency(saldo)}
                    </div>
                  </div>
                ) : (
                  <div className="month-empty">
                    <span>Sem dados</span>
                  </div>
                )}

                <div className="month-card-arrow">
                  <ChevronRight size={18} />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
