const operands = document.querySelectorAll('.operand') //used
const operators = document.querySelectorAll('.operator') //used
const calcInput = document.querySelector('#input') //used
const clearBtn = document.querySelector('#clear') //used
const buttons = document.querySelectorAll('.button') //used
const evalBtn = document.querySelector('#eval') //used
const miscBtns = document.querySelectorAll('.misc') //used

const calculator = {
  currentNumber: null,
  previousNumber: null,
  operation: null,
  resetDisplay: false,
}

const formatter = new Intl.NumberFormat('en-US')

const calculateResult = () => {
  const a = Number(calculator.previousNumber)
  const b = Number(calcInput.value.replace(/,/g, ''))
  const op = calculator.operation
  let sum = null

  switch (op) {
    case '+':
      sum = a + b
      break

    case '-':
      sum = a - b
      break

    case '*':
      sum = a * b
      break

    case '/':
      sum = a / b
      break

    default:
      sum = null
      break
  }

  return sum.toFixed(3)
}

operators.forEach(operator => {
  operator.addEventListener('click', function () {
    operators.forEach(op => {
      if (this !== op) {
        op.classList.remove('operator-active')
      }
    })

    this.classList.toggle('operator-active')

    if (calculator.currentNumber !== null && calculator.operation !== null) {
      calculator.previousNumber = calculateResult()
      calcInput.value = formatter.format(
        calculator.previousNumber.replace(/,/g, '')
      )
    } else {
      calculator.previousNumber = Number(calcInput.value.replace(/,/g, ''))
    }

    calculator.currentNumber = null
    calculator.resetDisplay = true
    calculator.operation = this.dataset.value
  })
})

evalBtn.addEventListener('click', function () {
  operators.forEach(op => {
    op.classList.remove('operator-active')
  })

  this.classList.add('operator-active')
  setTimeout(() => {
    this.classList.remove('operator-active')
  }, 100)

  if (calculator.operation !== null && calculator.currentNumber !== null) {
    calculator.previousNumber = calculateResult()
    calcInput.value = formatter.format(
      calculator.previousNumber.replace(/,/g, '')
    )
    calculator.resetDisplay = true
    calculator.operation = null
    calculator.currentNumber = null
  }
})

// control what the number butotns should do
operands.forEach(operand => {
  operand.addEventListener('click', function () {
    operators.forEach(op => {
      op.classList.remove('operator-active')
    })
    this.classList.add('operand-active')
    setTimeout(() => {
      this.classList.remove('operand-active')
    }, 100)

    if (calculator.resetDisplay) {
      calcInput.value = ''
      calculator.resetDisplay = false
    }

    calcInput.value += this.dataset.value

    if (this.dataset.value !== '.') {
      calcInput.value = formatter.format(calcInput.value.replace(/,/g, ''))
    }

    if (calculator.currentNumber === null) {
      calculator.currentNumber = Number(calcInput.value.replace(/,/g, ''))
    }

    if (calcInput.value.length) {
      clearBtn.innerText = 'C'
    }
  })
})

// control what the clear button should do
clearBtn.addEventListener('click', function () {
  calcInput.value = ''
  this.innerText = 'AC'
  calculator.currentNumber = null
  calculator.previousNumber = null
  calculator.operation = null
  calculator.resetDisplay = true
  operators.forEach(op => {
    op.classList.remove('operator-active')
  })
})

// control what the misc buttons do
miscBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.add('misc-active')
    setTimeout(() => {
      this.classList.remove('misc-active')
    }, 100)
    if (this.dataset.value === 'negative') {
      calcInput.value = `-${calcInput.value}`
      this.dataset.value = 'positive'
    } else if (this.dataset.value === 'positive') {
      calcInput.value = calcInput.value.substring(1)
      this.dataset.value = 'negative'
    } else {
      return false
    }
  })
})

// fetch key pressed and click the right button
window.addEventListener('keypress', function (e) {
  buttons.forEach(btn => {
    let btnVal = btn.dataset.value
    let btnValAlt = null
    switch (btnVal) {
      case '*':
        btnValAlt = 'x'
        break

      case 'AC':
        btnValAlt = 'c'
        break

      case 'negative':
        btnValAlt = 'n'
        break

      case 'positive':
        btnValAlt = 'n'
        break

      case '%':
        btnValAlt = 'p'
        break

      default:
        btnValAlt = null
        break
    }
    if (e.key === btnVal || e.key === btnValAlt) {
      btn.click()
    }
  })
})
