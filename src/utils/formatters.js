export const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0)
}

export const formatPercent = (value) => {
  return `${value.toFixed(1)}%`
}

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}
