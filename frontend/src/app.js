import './styles.css'
import { checkFormValidity, getFormValues, toCurrency } from './utils'
import { loanService } from './services'
import { getTotalValue, getInstallmentValue } from './domain'
import constants from './constants'

export const CreditasChallenge = (() => {
  const formElement = document.getElementById('form')
  const installmentsElement = document.getElementById('installments')
  const warrantyTypeElement = document.getElementById('warrantytype')
  const warrantyValueElement = document.getElementById('warrantyvalue')
  const warrantyRangeElement = document.getElementById('warrantyvaluerange')
  const loanElement = document.getElementById('loanvalue')
  const loanRangeElement = document.getElementById('loanvaluerange')
  const installmentValueElement = document.getElementById('installmentvalue')
  const totalElement = document.getElementById('totalvalue')
  const taxElement = document.getElementById('taxvalue')

  const handleChangeForm = () => {
    const totalValue = getTotalValue({ installments: installmentsElement.value, loanAmount: loanElement.value })
    const installmentValue = getInstallmentValue({ installments: installmentsElement.value, totalValue })

    totalElement.innerHTML = toCurrency({ value: totalValue })
    installmentValueElement.innerHTML = toCurrency({ value: installmentValue })
    taxElement.innerHTML = `${toCurrency({ value: constants.iof * 100 })}%`
  }

  const handleChangeWarrantyType = event =>
    (installmentsElement.innerHTML = constants[event.target.value].installments.map(i => `<option value=${i}>${i}</option>`).join(''))

  const submitForm = (event, formElement) => {
    event.preventDefault()

    checkFormValidity(formElement) &&
      loanService.create(getFormValues(formElement))
        .then(result => window.confirm(result, 'Your form submited success'))
        .catch(error => window.alert('Your form submited error', error))
  }

  const registerEvents = () => {
    warrantyRangeElement.addEventListener('input', event => (warrantyValueElement.value = event.target.value))

    loanRangeElement.addEventListener('input', event => (loanElement.value = event.target.value))

    formElement.addEventListener('change', handleChangeForm)

    formElement.addEventListener('submit', event => submitForm(event, formElement))

    warrantyTypeElement.addEventListener('change', handleChangeWarrantyType)

    handleChangeForm()
  }

  return {
    initialize () {
      registerEvents()
    }
  }
})()
