import { useState } from 'react'
import { useFinance, CATEGORIAS, MESES } from '../context/FinanceContext'
import { useToast } from './Toast'
import { Plus, X, DollarSign } from 'lucide-react'

function QuickExpense() {
  const { updateValue, selectedYear } = useFinance()
  const { addToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [valor, setValor] = useState('')
  const [categoria, setCategoria] = useState('')
  const [tipo, setTipo] = useState('despesasVariaveis')
  const [mes, setMes] = useState(new Date().getMonth())

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!valor || !categoria) {
      addToast('Por favor, preencha todos os campos', 'warning')
      return
    }

    updateValue(mes, tipo, categoria, valor)

    // Reset form
    setValor('')
    setCategoria('')
    setIsOpen(false)

    // Feedback
    addToast('Valor adicionado com sucesso!', 'success')
  }

  const getCategorias = () => {
    switch(tipo) {
      case 'receitas':
        return CATEGORIAS.receitas
      case 'despesasFixas':
        return CATEGORIAS.despesasFixas
      case 'despesasVariaveis':
        return CATEGORIAS.despesasVariaveis
      default:
        return []
    }
  }

  return (
    <>
      <button
        className="quick-expense-button"
        onClick={() => setIsOpen(true)}
        aria-label="Adicionar despesa rápida"
      >
        <Plus size={24} />
      </button>

      {isOpen && (
        <div className="quick-expense-modal" onClick={() => setIsOpen(false)}>
          <div className="quick-expense-content" onClick={(e) => e.stopPropagation()}>
            <div className="quick-expense-header">
              <h3>Adicionar Rápido</h3>
              <button
                className="quick-expense-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="quick-expense-form">
              <div className="form-group">
                <label htmlFor="quick-mes">Mês</label>
                <select
                  id="quick-mes"
                  value={mes}
                  onChange={(e) => setMes(Number(e.target.value))}
                  className="quick-select"
                >
                  {MESES.map((mesNome, index) => (
                    <option key={index} value={index}>
                      {mesNome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quick-tipo">Tipo</label>
                <select
                  id="quick-tipo"
                  value={tipo}
                  onChange={(e) => {
                    setTipo(e.target.value)
                    setCategoria('') // Reset categoria quando mudar tipo
                  }}
                  className="quick-select"
                >
                  <option value="receitas">Receita</option>
                  <option value="despesasFixas">Despesa Fixa</option>
                  <option value="despesasVariaveis">Despesa Variável</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quick-categoria">Categoria</label>
                <select
                  id="quick-categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="quick-select"
                  required
                >
                  <option value="">Selecione...</option>
                  {getCategorias().map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quick-valor">Valor</label>
                <div className="quick-input-wrapper">
                  <DollarSign size={20} className="quick-input-icon" />
                  <input
                    id="quick-valor"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    className="quick-input"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div className="quick-expense-actions">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-cancel"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default QuickExpense
