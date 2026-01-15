import { createContext, useContext, useState, useEffect } from 'react'
import CryptoJS from 'crypto-js'

const FinanceContext = createContext()

// Chave de criptografia para os dados financeiros
const ENCRYPTION_KEY = 'MyFinance_DataKey_2026_v1'

// Estrutura de categorias
export const CATEGORIAS = {
  receitas: [
    { id: 'salario_principal', nome: 'Salário Principal' },
    { id: 'salario_conjuge', nome: 'Salário Cônjuge' },
    { id: 'freelance', nome: 'Freelance/Bicos' },
    { id: 'investimentos', nome: 'Rendimentos de Investimentos' },
    { id: 'decimo_terceiro', nome: '13º Salário' },
    { id: 'ferias', nome: 'Férias' },
    { id: 'outras_receitas', nome: 'Outras Receitas' }
  ],
  despesasFixas: [
    { id: 'aluguel', nome: 'Aluguel/Financiamento Imóvel' },
    { id: 'condominio', nome: 'Condomínio' },
    { id: 'iptu', nome: 'IPTU' },
    { id: 'energia', nome: 'Energia Elétrica' },
    { id: 'agua', nome: 'Água e Esgoto' },
    { id: 'internet', nome: 'Internet + TV a Cabo' },
    { id: 'telefone', nome: 'Telefone/Celular' },
    { id: 'plano_saude', nome: 'Plano de Saúde' },
    { id: 'seguros', nome: 'Seguros (vida, carro, etc)' },
    { id: 'ipva', nome: 'IPVA' },
    { id: 'educacao', nome: 'Educação/Mensalidades/Cursos' },
    { id: 'transporte_fixo', nome: 'Transporte Fixo (estacionamento, pedágio)' },
    { id: 'academia', nome: 'Academia/Clube' },
    { id: 'assinaturas', nome: 'Assinaturas (Netflix, Spotify, etc)' },
    { id: 'financiamentos', nome: 'Financiamentos/Empréstimos' }
  ],
  despesasVariaveis: [
    { id: 'supermercado', nome: 'Supermercado/Alimentação' },
    { id: 'restaurantes', nome: 'Restaurantes/Delivery' },
    { id: 'transporte_variavel', nome: 'Transporte Variável (Uber, gasolina)' },
    { id: 'lazer', nome: 'Lazer/Diversão/Entretenimento' },
    { id: 'viagens', nome: 'Viagens' },
    { id: 'roupas', nome: 'Roupas/Vestuário/Calçados' },
    { id: 'farmacia', nome: 'Farmácia/Saúde/Médicos' },
    { id: 'beleza', nome: 'Beleza/Estética/Salão' },
    { id: 'presentes', nome: 'Presentes' },
    { id: 'pets', nome: 'Pets (ração, veterinário)' },
    { id: 'manutencao', nome: 'Manutenção/Reparos Casa' },
    { id: 'eletronicos', nome: 'Eletrônicos/Tecnologia' },
    { id: 'livros', nome: 'Livros/Cultura/Cursos Online' },
    { id: 'doacoes', nome: 'Doações' },
    { id: 'outras_variaveis', nome: 'Outras Despesas Variáveis' }
  ]
}

export const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]

const criarDadosVazios = () => {
  const dados = {}
  MESES.forEach((_, index) => {
    dados[index] = {
      receitas: {},
      despesasFixas: {},
      despesasVariaveis: {}
    }
  })
  return dados
}

export function FinanceProvider({ children }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [data, setData] = useState(criarDadosVazios())

  // Carregar dados ao mudar o ano
  useEffect(() => {
    loadData(selectedYear)
  }, [selectedYear])

  // Salvar dados quando houver mudança
  useEffect(() => {
    saveData(selectedYear, data)
  }, [data, selectedYear])

  const loadData = (year) => {
    try {
      const encryptedData = localStorage.getItem(`finance_data_${year}`)
      if (encryptedData) {
        const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8)
        const parsedData = JSON.parse(decrypted)
        setData(parsedData)
      } else {
        setData(criarDadosVazios())
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setData(criarDadosVazios())
    }
  }

  const saveData = (year, dataToSave) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(dataToSave),
        ENCRYPTION_KEY
      ).toString()
      localStorage.setItem(`finance_data_${year}`, encrypted)
    } catch (error) {
      console.error('Erro ao salvar dados:', error)
    }
  }

  const updateValue = (monthIndex, tipo, categoriaId, valor) => {
    setData(prevData => ({
      ...prevData,
      [monthIndex]: {
        ...prevData[monthIndex],
        [tipo]: {
          ...prevData[monthIndex][tipo],
          [categoriaId]: valor
        }
      }
    }))
  }

  const calcularTotal = (monthIndex, tipo) => {
    const categorias = data[monthIndex]?.[tipo] || {}
    return Object.values(categorias).reduce((acc, val) => acc + (parseFloat(val) || 0), 0)
  }

  const calcularSaldo = (monthIndex) => {
    const receitas = calcularTotal(monthIndex, 'receitas')
    const fixas = calcularTotal(monthIndex, 'despesasFixas')
    const variaveis = calcularTotal(monthIndex, 'despesasVariaveis')
    return receitas - fixas - variaveis
  }

  const calcularSaldoAcumulado = (monthIndex) => {
    let acumulado = 0
    for (let i = 0; i <= monthIndex; i++) {
      acumulado += calcularSaldo(i)
    }
    return acumulado
  }

  const calcularMediaUltimosMeses = (monthIndex, tipo, categoriaId) => {
    if (monthIndex === 0) return 0

    const valoresAnteriores = []
    for (let i = monthIndex - 1; i >= 0 && valoresAnteriores.length < 3; i--) {
      const valor = parseFloat(data[i]?.[tipo]?.[categoriaId]) || 0
      if (valor > 0) {
        valoresAnteriores.push(valor)
      }
    }

    if (valoresAnteriores.length === 0) return 0

    const soma = valoresAnteriores.reduce((acc, val) => acc + val, 0)
    return soma / valoresAnteriores.length
  }

  const aplicarPrevisao = (monthIndex) => {
    const novosDados = { ...data }
    const mesAtual = novosDados[monthIndex]

    CATEGORIAS.receitas.forEach(cat => {
      if (!mesAtual.receitas[cat.id] || mesAtual.receitas[cat.id] === '') {
        const media = calcularMediaUltimosMeses(monthIndex, 'receitas', cat.id)
        if (media > 0) {
          mesAtual.receitas[cat.id] = media.toFixed(2)
        }
      }
    })

    CATEGORIAS.despesasFixas.forEach(cat => {
      if (!mesAtual.despesasFixas[cat.id] || mesAtual.despesasFixas[cat.id] === '') {
        const media = calcularMediaUltimosMeses(monthIndex, 'despesasFixas', cat.id)
        if (media > 0) {
          mesAtual.despesasFixas[cat.id] = media.toFixed(2)
        }
      }
    })

    CATEGORIAS.despesasVariaveis.forEach(cat => {
      if (!mesAtual.despesasVariaveis[cat.id] || mesAtual.despesasVariaveis[cat.id] === '') {
        const media = calcularMediaUltimosMeses(monthIndex, 'despesasVariaveis', cat.id)
        if (media > 0) {
          mesAtual.despesasVariaveis[cat.id] = media.toFixed(2)
        }
      }
    })

    setData(novosDados)
  }

  const limparMes = (monthIndex) => {
    const novosDados = { ...data }
    novosDados[monthIndex] = {
      receitas: {},
      despesasFixas: {},
      despesasVariaveis: {}
    }
    setData(novosDados)
  }

  const limparTudo = () => {
    setData(criarDadosVazios())
  }

  const exportarDados = () => {
    const dataStr = JSON.stringify(data, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `financas_${selectedYear}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importarDados = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const dadosImportados = JSON.parse(e.target.result)
          setData(dadosImportados)
          resolve({ success: true })
        } catch (error) {
          reject({ success: false, error: 'Arquivo inválido' })
        }
      }
      reader.readAsText(file)
    })
  }

  const value = {
    selectedYear,
    setSelectedYear,
    data,
    updateValue,
    calcularTotal,
    calcularSaldo,
    calcularSaldoAcumulado,
    aplicarPrevisao,
    limparMes,
    limparTudo,
    exportarDados,
    importarDados
  }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance deve ser usado dentro de FinanceProvider')
  }
  return context
}
