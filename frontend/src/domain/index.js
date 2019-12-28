import constants from '../constants'

const totalValue = ({ installments = 0, loanAmount = 0 } = {}) => (constants.iof + constants.tax + (installments / 1000) + 1) * loanAmount

const installmentValue = ({ installments = 0, totalValue = 0 } = {}) => totalValue / installments || 0

export {
  totalValue,
  installmentValue,
}