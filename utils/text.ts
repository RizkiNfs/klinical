export function nFormatter(num = 0, digits = 0) {
  const si = [
    { value: 1, symbol: '' },
    { value: 1E3, symbol: 'K' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'G' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}
export function decimalSeparator(number: number, separator = '.') {
  let numberWithSeparator = new Number(number || 0).toString()
  numberWithSeparator = numberWithSeparator.replace(/\B(?=(\d{3})+(?!\d))/g, separator)
  if (separator === ',') numberWithSeparator = numberWithSeparator.replace('.', ',')

  return numberWithSeparator
}