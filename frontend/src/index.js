import './styles.css'
import { getTotalValue } from './domain'
import constants from './constants'

export const checkFormValidity = formElement => formElement.checkValidity()

export const getFormValues = formElement =>
  Object.values(formElement.elements)
    .filter(element => ['SELECT', 'INPUT'].includes(element.nodeName))
    .map(element => ({
      field: element.name,
      value: element.value
    }))

export const toStringFormValues = (values, totalValue) =>
  `CONFIRMAÇÃO\n\n${values
    .map(value => constants[value.field] && `${constants[value.field]}: ${value.value}`)
    .filter(value => value !== '')
    .join('\n')}`.concat(`\nTotal ${totalValue}`)

export function Send(values) {
  return new Promise((resolve, reject) => {
    try {
      const match = matchString => value => value.field === matchString
      const TIME = values.find(match('parcelas')).value
      const VEHICLE_LOAN_AMOUNT = values.find(match('valor-emprestimo')).value
      const TOTAL = getTotalValue({ installments: TIME, loanAmount: VEHICLE_LOAN_AMOUNT })

      resolve(toStringFormValues(values, TOTAL))
    } catch (error) {
      reject(error)
    }
  })
}

export function Submit(formElement) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault()
    if (checkFormValidity(formElement)) {
      Send(getFormValues(formElement))
        .then(result => confirm(result, 'Your form submited success'))
        .catch(error => Alert('Your form submited error', error))
    }
  })
}

export function handleChangeRangeVehicleUnderWarranty(
  warrantyRangeElement,
  vehicleWarrantyElement
) {
  warrantyRangeElement.addEventListener('input', function (event) {
    vehicleWarrantyElement.value = event.target.value
  })
}

export function handleChangeVehicleLoanAmount(
  loanAmountRangeElement,
  loanAmountElement
) {
  loanAmountRangeElement.addEventListener('input', function (event) {
    loanAmountElement.value = event.target.value
  })
}

export const CreditasChallenge = (() => {
  const installmentsElement = document.getElementById()
  const warrantyTypeElement = document.getElementById()
  const warrantyValueElement = document.getElementById()
  const warrantyRangeElement = document.getElementById()
  const loanElement = document.getElementById()
  const loanRangeElement = document.getElementById()
  const installmentValueElement = document.getElementById()
  const totalElement = document.getElementById()
  const taxElement = document.getElementById()
  const buttonElement = document.getElementById()

  const registerEvents = () => {
    Submit(document.querySelector('.form'))

    handleChangeRangeVehicleUnderWarranty(
      document.getElementById('valor-garantia-range'),
      document.getElementById('valor-garantia')
    )

    handleChangeVehicleLoanAmount(
      document.getElementById('valor-emprestimo-range'),
      document.getElementById('valor-emprestimo')
    )
  }

  return {
    initialize() {
      registerEvents()
    }
  }
})()

document.addEventListener('DOMContentLoaded', function () {
  CreditasChallenge.initialize()
})
