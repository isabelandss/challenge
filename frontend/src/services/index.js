import { getTotalValue } from '../domain'
import { toStringValues, match } from '../utils'

const loanService = {
  create: values => {
    return new Promise((resolve, reject) => {
      try {
        const installments = values.find(match('installments')).value
        const loanvalue = values.find(match('loanvalue')).value
        const totalvalue = getTotalValue({ installments: installments, loanAmount: loanvalue })
  
        resolve(toStringValues(values, totalvalue))
      } catch (error) {
        reject(error)
      }
    })
  }
}

export {
  loanService,
}
