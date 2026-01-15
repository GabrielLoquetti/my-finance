import { useParams } from 'react-router-dom'
import { useFinance, MESES, CATEGORIAS } from '../context/FinanceContext'
import { formatCurrency } from '../utils/formatters'
import MetricCard from '../components/MetricCard'
import { TrendingUp, TrendingDown, Calendar as CalendarIcon, Wallet, Wand2, Eraser } from 'lucide-react'

function Month() {
  const { monthIndex } = useParams()
  const month = parseInt(monthIndex)

  const {
    data,
    updateValue,
    calcularTotal,
    calcularSaldo,
    calcularSaldoAcumulado,
    aplicarPrevisao,
    limparMes
  } = useFinance()

  const totalReceitas = calcularTotal(month, 'receitas')
  const totalFixas = calcularTotal(month, 'despesasFixas')
  const totalVariaveis = calcularTotal(month, 'despesasVariaveis')
  const totalDespesas = totalFixas + totalVariaveis
  const saldoMes = calcularSaldo(month)
  const saldoAcumulado = calcularSaldoAcumulado(month)

  const temPrevisao = month > 0

  const handleAplicarPrevisao = () => {
    if (window.confirm('Deseja aplicar a previsão baseada nos meses anteriores?')) {
      aplicarPrevisao(month)
    }
  }

  const handleLimpar = () => {
    if (window.confirm('Deseja limpar todos os dados deste mês?')) {
      limparMes(month)
    }
  }

  const renderInputGroup = (categoria, tipo) => (
    <div key={categoria.id} className="input-group">
      <label htmlFor={categoria.id}>{categoria.nome}</label>
      <input
        id={categoria.id}
        type="number"
        step="0.01"
        placeholder="R$ 0,00"
        value={data[month]?.[tipo]?.[categoria.id] || ''}
        onChange={(e) => updateValue(month, tipo, categoria.id, e.target.value)}
      />
    </div>
  )

  return (
    <div className="month-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <CalendarIcon size={28} />
            {MESES[month]}
          </h2>
          <p className="page-subtitle">Gerencie as receitas e despesas do mês</p>
        </div>

        {temPrevisao && (
          <div className="header-actions">
            <button onClick={handleAplicarPrevisao} className="btn-secondary">
              <Wand2 size={18} />
              <span>Aplicar Previsão</span>
            </button>
            <button onClick={handleLimpar} className="btn-danger-outline">
              <Eraser size={18} />
              <span>Limpar Mês</span>
            </button>
          </div>
        )}
      </div>

      {temPrevisao && (
        <div className="info-banner">
          <div className="info-banner-icon">
            <Wand2 size={20} />
          </div>
          <div className="info-banner-content">
            <strong>Previsão Inteligente Disponível</strong>
            <p>Com base nos dados dos meses anteriores, você pode preencher automaticamente este mês com valores estimados usando a média dos últimos 3 meses.</p>
          </div>
        </div>
      )}

      <div className="metrics-grid">
        <MetricCard
          label="Total de Receitas"
          value={formatCurrency(totalReceitas)}
          type="positive"
          icon={<TrendingUp size={24} />}
        />
        <MetricCard
          label="Total de Despesas"
          value={formatCurrency(totalDespesas)}
          type="negative"
          icon={<TrendingDown size={24} />}
        />
        <MetricCard
          label="Saldo do Mês"
          value={formatCurrency(saldoMes)}
          type={saldoMes >= 0 ? 'neutral' : 'negative'}
          icon={<CalendarIcon size={24} />}
        />
        <MetricCard
          label="Saldo Acumulado no Banco"
          value={formatCurrency(saldoAcumulado)}
          type={saldoAcumulado >= 0 ? 'neutral' : 'negative'}
          icon={<Wallet size={24} />}
        />
      </div>

      {/* Receitas */}
      <div className="data-section section-receitas">
        <div className="section-header">
          <h3 className="section-title">Receitas</h3>
          <div className="section-total">
            Total: <span className="total-value positive">{formatCurrency(totalReceitas)}</span>
          </div>
        </div>
        <div className="inputs-grid">
          {CATEGORIAS.receitas.map(cat => renderInputGroup(cat, 'receitas'))}
        </div>
      </div>

      {/* Despesas Fixas */}
      <div className="data-section section-despesas-fixas">
        <div className="section-header">
          <h3 className="section-title">Despesas Fixas</h3>
          <div className="section-total">
            Total: <span className="total-value warning">{formatCurrency(totalFixas)}</span>
          </div>
        </div>
        <div className="inputs-grid">
          {CATEGORIAS.despesasFixas.map(cat => renderInputGroup(cat, 'despesasFixas'))}
        </div>
      </div>

      {/* Despesas Variáveis */}
      <div className="data-section section-despesas-variaveis">
        <div className="section-header">
          <h3 className="section-title">Despesas Variáveis</h3>
          <div className="section-total">
            Total: <span className="total-value negative">{formatCurrency(totalVariaveis)}</span>
          </div>
        </div>
        <div className="inputs-grid">
          {CATEGORIAS.despesasVariaveis.map(cat => renderInputGroup(cat, 'despesasVariaveis'))}
        </div>
      </div>

      {/* Resumo */}
      <div className="summary-section">
        <h3 className="section-title">Resumo de {MESES[month]}</h3>
        <div className="summary-grid">
          <div className="summary-item summary-receitas">
            <span className="summary-label">Total Receitas</span>
            <span className="summary-value">{formatCurrency(totalReceitas)}</span>
          </div>
          <div className="summary-item summary-fixas">
            <span className="summary-label">Total Despesas Fixas</span>
            <span className="summary-value">{formatCurrency(totalFixas)}</span>
          </div>
          <div className="summary-item summary-variaveis">
            <span className="summary-label">Total Despesas Variáveis</span>
            <span className="summary-value">{formatCurrency(totalVariaveis)}</span>
          </div>
          <div className="summary-item summary-despesas">
            <span className="summary-label">Total Geral Despesas</span>
            <span className="summary-value">{formatCurrency(totalDespesas)}</span>
          </div>
          <div className="summary-item summary-saldo">
            <span className="summary-label">Saldo do Mês</span>
            <span className="summary-value">{formatCurrency(saldoMes)}</span>
          </div>
          <div className="summary-item summary-banco">
            <span className="summary-label">💰 Saldo Acumulado no Banco</span>
            <span className="summary-value highlight">{formatCurrency(saldoAcumulado)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Month
