/* eslint-disable no-undef */
import { toCurrency } from '.'

describe('METHOD: toCurrency', () => {
  test('should be a function', () => {
    expect(typeof toCurrency).toBe('function')
  })

  test('should return default value', () => {
    const expected = '0.00'
    const received = toCurrency()
    expect(received).toBe(expected)
  })

  test('should return formated value', () => {
    const expected = '1,000.00'
    const received = toCurrency({ value: 1000 })
    expect(received).toBe(expected)
  })

  test('should return formated value with symbol', () => {
    const expected = 'R$1,000.00'
    const received = toCurrency({ value: 1000, withSymbol: true })
    expect(received).toBe(expected)
  })

  test('should return formated value with more decimals', () => {
    const expected = '1,000.1235'
    const received = toCurrency({ value: 1000.1234567, numDecimal: 4 })
    expect(received).toBe(expected)
  })
})
