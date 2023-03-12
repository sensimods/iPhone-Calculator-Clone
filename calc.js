const nm = document.querySelectorAll('.operand')
const op = document.querySelectorAll('.operator')
const ci = document.querySelector('#input')
const cb = document.querySelector('#clear')
const btns = document.querySelectorAll('.button')
const eBtn = document.querySelector('#eval')
const mBtns = document.querySelectorAll('.misc')
const c = {
  cn: null,
  pn: null,
  op: null,
  rd: false,
}
const f = new Intl.NumberFormat('en-US')

const cr = () => {
  const a = Number(c.pn)
  const b = Number(ci.value.replace(/,/g, ''))
  const op = c.op
  let s = null

  switch (op) {
    case '+':
      s = a + b
      break

    case '-':
      s = a - b
      break

    case '*':
      s = a * b
      break

    case '/':
      s = a / b
      break

    default:
      s = null
      break
  }

  return s.toFixed(3)
}

op.forEach(operator => {
  operator.addEventListener('click', function () {
    op.forEach(op => {
      if (this !== op) {
        op.classList.remove('operator-active')
      }
    })

    this.classList.toggle('operator-active')

    if (c.cn !== null && c.op !== null) {
      c.pn = cr()
      ci.value = f.format(c.pn.replace(/,/g, ''))
    } else {
      c.pn = Number(ci.value.replace(/,/g, ''))
    }

    c.cn = null
    c.rd = true
    c.op = this.dataset.value
  })
})

eBtn.addEventListener('click', function () {
  op.forEach(op => {
    op.classList.remove('operator-active')
  })

  this.classList.add('operator-active')
  setTimeout(() => {
    this.classList.remove('operator-active')
  }, 100)

  if (c.op !== null && c.cn !== null) {
    c.pn = cr()
    ci.value = f.format(c.pn.replace(/,/g, ''))
    c.rd = true
    c.op = null
    c.cn = null
  }
})

nm.forEach(operand => {
  operand.addEventListener('click', function () {
    op.forEach(op => {
      op.classList.remove('operator-active')
    })
    this.classList.add('operand-active')
    setTimeout(() => {
      this.classList.remove('operand-active')
    }, 100)

    if (c.rd) {
      ci.value = ''
      c.rd = false
    }

    ci.value += this.dataset.value

    if (this.dataset.value !== '.') {
      ci.value = f.format(ci.value.replace(/,/g, ''))
    }

    if (c.cn === null) {
      c.cn = Number(ci.value.replace(/,/g, ''))
    }

    if (ci.value.length) {
      cb.innerText = 'C'
    }
  })
})

cb.addEventListener('click', function () {
  ci.value = ''
  this.innerText = 'AC'
  c.cn = null
  c.pn = null
  c.op = null
  c.rd = true
  op.forEach(op => {
    op.classList.remove('operator-active')
  })
})

mBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    this.classList.add('misc-active')
    setTimeout(() => {
      this.classList.remove('misc-active')
    }, 100)
    if (this.dataset.value === 'negative') {
      ci.value = `-${ci.value}`
      this.dataset.value = 'positive'
    } else if (this.dataset.value === 'positive') {
      ci.value = ci.value.substring(1)
      this.dataset.value = 'negative'
    } else {
      return false
    }
  })
})

window.addEventListener('keypress', function (e) {
  btns.forEach(btn => {
    let bv = btn.dataset.value
    let bva = null
    switch (bv) {
      case '*':
        bva = 'x'
        break

      case 'AC':
        bva = 'c'
        break

      case 'negative':
        bva = 'n'
        break

      case 'positive':
        bva = 'n'
        break

      case '%':
        bva = 'p'
        break

      default:
        bva = null
        break
    }
    if (e.key === bv || e.key === bva) {
      btn.click()
    }
  })
})
