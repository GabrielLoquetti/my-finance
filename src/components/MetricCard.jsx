function MetricCard({ label, value, type = 'neutral', icon }) {
  const getTypeClass = () => {
    switch (type) {
      case 'positive':
        return 'metric-positive'
      case 'negative':
        return 'metric-negative'
      case 'neutral':
        return 'metric-neutral'
      default:
        return 'metric-neutral'
    }
  }

  return (
    <div className="metric-card">
      {icon && <div className="metric-icon">{icon}</div>}
      <div className="metric-label">{label}</div>
      <div className={`metric-value ${getTypeClass()}`}>{value}</div>
    </div>
  )
}

export default MetricCard
