import { installmentValue, totalValue } from '.'

describe('METHOD: totalValue', () => {
  test('should be a function', () => {
    expect(typeof totalValue).toBe('function')
  })

  test('should return zero when no parameters', () => {
    const expected = 0
    const received = totalValue()
    expect(received).toEqual(expected)
  })

  test('should return total value', () => {
    const expected = 26668.8
    const received = totalValue({ installments: 24, loanAmount: 24000 })
    expect(received).toEqual(expected)
  })
})

describe('METHOD: installmentValue', () => {
  test('should be a function', () => {
    expect(typeof installmentValue).toBe('function')
  })

  test('should return zero when no parameters', () => {
    const expected = 0
    const received = installmentValue()
    expect(received).toEqual(expected)
  })

  test('should return installment value', () => {
    const expected = 1000
    const received = installmentValue({ installments: 24, totalValue: 24000 })
    expect(received).toEqual(expected)
  })
})