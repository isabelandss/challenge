import './styles.css'
import { checkFormValidity, getFormValues } from './utils'
import { loanService } from './services'

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
  const buttonElement = document.getElementById('button')

  const submitForm = (event, formElement) => {
    event.preventDefault()

    checkFormValidity(formElement)
      && loanService.create(getFormValues(formElement))
        .then(result => window.confirm(result, 'Your form submited success'))
        .catch(error => window.alert('Your form submited error', error))
  }

  const registerEvents = () => {
    warrantyRangeElement.addEventListener('input', event => warrantyValueElement.value = event.target.value)

    loanRangeElement.addEventListener('input', event => loanElement.value = event.target.value)

    formElement.addEventListener('submit', event => submitForm(event, formElement))
  }

  return {
    initialize() {
      registerEvents()
    }
  }
})()