import { useState } from 'react'
import { useFinance, MESES } from '../context/FinanceContext'
import { formatCurrency, formatPercent } from '../utils/formatters'
import MetricCard from '../components/MetricCard'
import { Target, TrendingUp, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

function Planning() {
  const { calcularTotal, selectedYear } = useFinance()

  // Regra 50/30/20 como padrão
  const [essenciais, setEssenciais] = useState(50)
  const [desejos, setDesejos] = useState(30)
  const [poupanca, setPoupanca] = useState(20)

  // Calcular médias do ano
  const calcularMediaMensal = (tipo) => {
    let total = 0
    let mesesComDados = 0

    MESES.forEach((_, index) => {
      const valor = calcularTotal(index, tipo)
      if (valor > 0) {
        total += valor
        mesesComDados++
      }
    })

    return mesesComDados > 0 ? total / mesesComDados : 0
  }

  const mediaReceitas = calcularMediaMensal('receitas')
  const mediaDespesasFixas = calcularMediaMensal('despesasFixas')
  const mediaDespesasVariaveis = calcularMediaMensal('despesasVariaveis')
  const mediaDespesasTotal = mediaDespesasFixas + mediaDespesasVariaveis

  // Metas baseadas nas porcentagens
  const metaEssenciais = mediaReceitas * (essenciais / 100)
  const metaDesejos = mediaReceitas * (desejos / 100)
  const metaPoupanca = mediaReceitas * (poupanca / 100)

  // Verificar se está dentro da meta (considerar despesas fixas como essenciais)
  const gastosEssenciais = mediaDespesasFixas
  const gastosDesejos = mediaDespesasVariaveis
  const economiaReal = mediaReceitas - mediaDespesasTotal

  const porcentagemEssenciais = mediaReceitas > 0 ? (gastosEssenciais / mediaReceitas) * 100 : 0
  const porcentagemDesejos = mediaReceitas > 0 ? (gastosDesejos / mediaReceitas) * 100 : 0
  const porcentagemPoupanca = mediaReceitas > 0 ? (economiaReal / mediaReceitas) * 100 : 0

  const dentroMetaEssenciais = porcentagemEssenciais <= essenciais
  const dentroMetaDesejos = porcentagemDesejos <= desejos
  const dentroMetaPoupanca = porcentagemPoupanca >= poupanca

  const totalPorcentagem = essenciais + desejos + poupanca

  const handleReset = () => {
    setEssenciais(50)
    setDesejos(30)
    setPoupanca(20)
  }

  const getStatusIcon = (dentro) => {
    return dentro ? (
      <CheckCircle2 size={20} className="status-icon-success" />
    ) : (
      <XCircle size={20} className="status-icon-error" />
    )
  }

  return (
    <div className="planning-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">
            <Target size={28} />
            Planejamento Financeiro
          </h2>
          <p className="page-subtitle">Configure suas metas e acompanhe seu progresso em {selectedYear}</p>
        </div>
      </div>

      {totalPorcentagem !== 100 && (
        <div className="alert-banner warning">
          <AlertCircle size={20} />
          <span>Atenção: A soma das porcentagens deve ser 100%. Atualmente: {totalPorcentagem}%</span>
        </div>
      )}

      <div className="planning-config">
        <h3 className="section-title">Configure Suas Metas de Distribuição</h3>
        <p className="section-description">
          Defina como você deseja distribuir sua renda. A regra 50/30/20 é um ponto de partida comum.
        </p>

        <div className="config-grid">
          <div className="config-item">
            <label htmlFor="essenciais">
              Essenciais (Despesas Fixas)
              <span className="config-description">Moradia, contas, alimentação básica</span>
            </label>
            <div className="config-input-group">
              <input
                id="essenciais"
                type="range"
                min="0"
                max="100"
                value={essenciais}
                onChange={(e) => setEssenciais(Number(e.target.value))}
                className="config-slider"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={essenciais}
                onChange={(e) => setEssenciais(Number(e.target.value))}
                className="config-number"
              />
              <span className="config-unit">%</span>
            </div>
          </div>

          <div className="config-item">
            <label htmlFor="desejos">
              Desejos (Despesas Variáveis)
              <span className="config-description">Lazer, restaurantes, compras</span>
            </label>
            <div className="config-input-group">
              <input
                id="desejos"
                type="range"
                min="0"
                max="100"
                value={desejos}
                onChange={(e) => setDesejos(Number(e.target.value))}
                className="config-slider"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={desejos}
                onChange={(e) => setDesejos(Number(e.target.value))}
                className="config-number"
              />
              <span className="config-unit">%</span>
            </div>
          </div>

          <div className="config-item">
            <label htmlFor="poupanca">
              Poupança e Investimentos
              <span className="config-description">Reserva de emergência, investimentos</span>
            </label>
            <div className="config-input-group">
              <input
                id="poupanca"
                type="range"
                min="0"
                max="100"
                value={poupanca}
                onChange={(e) => setPoupanca(Number(e.target.value))}
                className="config-slider"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={poupanca}
                onChange={(e) => setPoupanca(Number(e.target.value))}
                className="config-number"
              />
              <span className="config-unit">%</span>
            </div>
          </div>
        </div>

        <div className="config-actions">
          <button onClick={handleReset} className="btn-secondary">
            Restaurar Regra 50/30/20
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <MetricCard
          label="Média de Receitas Mensais"
          value={formatCurrency(mediaReceitas)}
          type="positive"
          icon={<TrendingUp size={24} />}
        />
        <MetricCard
          label="Média de Despesas Mensais"
          value={formatCurrency(mediaDespesasTotal)}
          type="negative"
          icon={<TrendingUp size={24} />}
        />
        <MetricCard
          label="Média de Economia Mensal"
          value={formatCurrency(economiaReal)}
          type={economiaReal >= 0 ? 'positive' : 'negative'}
          icon={<Target size={24} />}
        />
        <MetricCard
          label="Taxa de Economia Atual"
          value={formatPercent(porcentagemPoupanca)}
          type={dentroMetaPoupanca ? 'positive' : 'negative'}
          icon={<Target size={24} />}
        />
      </div>

      <div className="planning-analysis">
        <h3 className="section-title">Análise do Seu Planejamento</h3>

        <div className="analysis-grid">
          <div className={`analysis-card ${dentroMetaEssenciais ? 'success' : 'warning'}`}>
            <div className="analysis-header">
              <div className="analysis-title">
                {getStatusIcon(dentroMetaEssenciais)}
                <span>Essenciais</span>
              </div>
              <div className="analysis-meta">
                Meta: {essenciais}%
              </div>
            </div>
            <div className="analysis-body">
              <div className="analysis-current">
                <span className="analysis-label">Gasto Atual:</span>
                <span className="analysis-value">{formatCurrency(gastosEssenciais)}</span>
              </div>
              <div className="analysis-target">
                <span className="analysis-label">Meta:</span>
                <span className="analysis-value">{formatCurrency(metaEssenciais)}</span>
              </div>
              <div className="analysis-percent">
                <span className="analysis-label">Porcentagem Atual:</span>
                <span className={`analysis-value ${dentroMetaEssenciais ? 'success-text' : 'warning-text'}`}>
                  {formatPercent(porcentagemEssenciais)}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${dentroMetaEssenciais ? 'success-fill' : 'warning-fill'}`}
                  style={{ width: `${Math.min(porcentagemEssenciais, 100)}%` }}
                ></div>
              </div>
              {!dentroMetaEssenciais && (
                <div className="analysis-tip">
                  Você está gastando {formatPercent(porcentagemEssenciais - essenciais)} a mais que o planejado em despesas essenciais.
                </div>
              )}
            </div>
          </div>

          <div className={`analysis-card ${dentroMetaDesejos ? 'success' : 'warning'}`}>
            <div className="analysis-header">
              <div className="analysis-title">
                {getStatusIcon(dentroMetaDesejos)}
                <span>Desejos</span>
              </div>
              <div className="analysis-meta">
                Meta: {desejos}%
              </div>
            </div>
            <div className="analysis-body">
              <div className="analysis-current">
                <span className="analysis-label">Gasto Atual:</span>
                <span className="analysis-value">{formatCurrency(gastosDesejos)}</span>
              </div>
              <div className="analysis-target">
                <span className="analysis-label">Meta:</span>
                <span className="analysis-value">{formatCurrency(metaDesejos)}</span>
              </div>
              <div className="analysis-percent">
                <span className="analysis-label">Porcentagem Atual:</span>
                <span className={`analysis-value ${dentroMetaDesejos ? 'success-text' : 'warning-text'}`}>
                  {formatPercent(porcentagemDesejos)}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${dentroMetaDesejos ? 'success-fill' : 'warning-fill'}`}
                  style={{ width: `${Math.min(porcentagemDesejos, 100)}%` }}
                ></div>
              </div>
              {!dentroMetaDesejos && (
                <div className="analysis-tip">
                  Você está gastando {formatPercent(porcentagemDesejos - desejos)} a mais que o planejado em desejos.
                </div>
              )}
            </div>
          </div>

          <div className={`analysis-card ${dentroMetaPoupanca ? 'success' : 'warning'}`}>
            <div className="analysis-header">
              <div className="analysis-title">
                {getStatusIcon(dentroMetaPoupanca)}
                <span>Poupança</span>
              </div>
              <div className="analysis-meta">
                Meta: {poupanca}%
              </div>
            </div>
            <div className="analysis-body">
              <div className="analysis-current">
                <span className="analysis-label">Economia Atual:</span>
                <span className="analysis-value">{formatCurrency(economiaReal)}</span>
              </div>
              <div className="analysis-target">
                <span className="analysis-label">Meta:</span>
                <span className="analysis-value">{formatCurrency(metaPoupanca)}</span>
              </div>
              <div className="analysis-percent">
                <span className="analysis-label">Porcentagem Atual:</span>
                <span className={`analysis-value ${dentroMetaPoupanca ? 'success-text' : 'warning-text'}`}>
                  {formatPercent(porcentagemPoupanca)}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${dentroMetaPoupanca ? 'success-fill' : 'warning-fill'}`}
                  style={{ width: `${Math.min(porcentagemPoupanca, 100)}%` }}
                ></div>
              </div>
              {!dentroMetaPoupanca && (
                <div className="analysis-tip">
                  Você está economizando {formatPercent(poupanca - porcentagemPoupanca)} a menos que o planejado.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Planning
