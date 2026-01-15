import { useEffect, useRef } from 'react'
import { useFinance, MESES } from '../context/FinanceContext'
import { useToast } from '../components/Toast'
import { formatCurrency, formatPercent } from '../utils/formatters'
import MetricCard from '../components/MetricCard'
import { TrendingUp, TrendingDown, Wallet, PiggyBank, Download, Upload, Trash2 } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function Dashboard() {
  const { data, calcularTotal, calcularSaldoAcumulado, exportarDados, importarDados, limparTudo, selectedYear } = useFinance()
  const { addToast } = useToast()
  const fileInputRef = useRef(null)

  const calcularTotaisAno = () => {
    let totalReceitas = 0
    let totalDespesas = 0

    MESES.forEach((_, index) => {
      totalReceitas += calcularTotal(index, 'receitas')
      totalDespesas += calcularTotal(index, 'despesasFixas') + calcularTotal(index, 'despesasVariaveis')
    })

    const saldoFinal = calcularSaldoAcumulado(11)
    const taxaEconomia = totalReceitas > 0 ? ((totalReceitas - totalDespesas) / totalReceitas * 100) : 0

    return { totalReceitas, totalDespesas, saldoFinal, taxaEconomia }
  }

  const { totalReceitas, totalDespesas, saldoFinal, taxaEconomia } = calcularTotaisAno()

  // Dados para o gráfico
  const chartData = {
    labels: MESES,
    datasets: [
      {
        label: 'Receitas',
        data: MESES.map((_, index) => calcularTotal(index, 'receitas')),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Despesas',
        data: MESES.map((_, index) => calcularTotal(index, 'despesasFixas') + calcularTotal(index, 'despesasVariaveis')),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Saldo Acumulado',
        data: MESES.map((_, index) => calcularSaldoAcumulado(index)),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            family: 'Inter',
            size: 13,
            weight: 500
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(99, 102, 241, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y)
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter'
          },
          callback: function(value) {
            return formatCurrency(value)
          }
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          color: '#94a3b8',
          font: {
            family: 'Inter'
          }
        },
        grid: {
          display: false
        }
      }
    }
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        await importarDados(file)
        addToast('Dados importados com sucesso!', 'success')
      } catch (error) {
        addToast('Erro ao importar dados. Verifique o arquivo.', 'error')
      }
    }
  }

  const handleClear = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados do ano? Esta ação não pode ser desfeita.')) {
      limparTudo()
      addToast('Dados limpos com sucesso!', 'success')
    }
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard Anual {selectedYear}</h2>
          <p className="page-subtitle">Visão geral completa das suas finanças</p>
        </div>
      </div>

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
          label="Saldo Final Acumulado"
          value={formatCurrency(saldoFinal)}
          type={saldoFinal >= 0 ? 'neutral' : 'negative'}
          icon={<Wallet size={24} />}
        />
        <MetricCard
          label="Taxa de Economia"
          value={formatPercent(taxaEconomia)}
          type={taxaEconomia >= 0 ? 'positive' : 'negative'}
          icon={<PiggyBank size={24} />}
        />
      </div>

      <div className="chart-section">
        <h3 className="section-title">Evolução Mensal</h3>
        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="actions-section">
        <h3 className="section-title">Gerenciar Dados</h3>
        <div className="actions-grid">
          <button onClick={exportarDados} className="action-btn action-primary">
            <Download size={20} />
            <span>Exportar Dados</span>
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="action-btn action-primary">
            <Upload size={20} />
            <span>Importar Dados</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />

          <button onClick={handleClear} className="action-btn action-danger">
            <Trash2 size={20} />
            <span>Limpar Todos os Dados</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
