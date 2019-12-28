const toCurrency = ({ value = 0, withSymbol = false, numDecimal = 2 } = {}) => {
  const defaultOptions = { minimumFractionDigits: 2, maximumFractionDigits: numDecimal }
  const symbolOptions = withSymbol ? { style: 'currency', currency: 'BRL' } : {} 
  return Number(value).toLocaleString('pt-BR', { ...defaultOptions, ...symbolOptions })
}

export {
  toCurrency,
}
