import Decimal from "decimal.js"

export let remainder = (el, kurs, isLoadKurs) => {
  if (!isLoadKurs) return 'No kurs' 
  let length = el.transaction.length
  if (length === 0) return addZeroes(el.budget)
  let sumTransactions = 0
  
  for (let i = 0; i < length; i++) {
    let x = new Decimal(sumTransactions)
    let priceT = new Decimal(el.transaction[i].price)
    let currencyT = el.transaction[i].currency
    let currencyB = el.currency
    let y = x.plus(priceT.mul(currencyB === currencyT ? 1 : kurs[currencyT][currencyB]))
    sumTransactions =  y
  }
  return addZeroes(new Decimal(el.budget).minus(sumTransactions))
}

export let maxTransaction = (el, kurs) => {
  if (el.transaction.length === 0) return '---'
  let minNumber = 0
  let currencyB = el.currency
  
  for (let i = 0; i < el.transaction.length; i++) {
    let currencyT = el.transaction[i].currency
    let result = new Decimal(el.transaction[i].price).mul(currencyB === currencyT ? 1 : kurs[currencyT][currencyB])
    minNumber = minNumber || result
    if (minNumber < result) {
      minNumber = result
    } 
  }
  return addZeroes(minNumber)
}

export let minTransaction = (el, kurs) => {
  if (el.transaction.length === 0) return '---'
  let minNumber = 0
  let currencyB = el.currency
  
  for (let i = 0; i < el.transaction.length; i++) {
    let currencyT = el.transaction[i].currency
    let result = new Decimal(el.transaction[i].price).mul(currencyB === currencyT ? 1 : kurs[currencyT][currencyB])
    minNumber = minNumber || result
    if (minNumber > result) {
      minNumber = result
    } 
  }
  return addZeroes(minNumber)
}

export let date = (ms) => {
  let date = new Date(ms)
  let Y = date.getFullYear()
  let M = addZerro(date.getMonth() + 1)
  let D = addZerro(date.getDate())

  let h = addZerro(date.getHours())
  let m = addZerro(date.getMinutes())
  let s = addZerro(date.getSeconds())

  function addZerro(number) {
    return number > 9 ? number : '0' + number
  }

  return `${h}:${m}:${s} - ${D}.${M}.${Y}`
}

export let middle = (el, kurs) => {
  if (el.transaction.length === 0) return '---'
  let minNumber = 0
  let currencyB = el.currency
  
  for (let i = 0; i < el.transaction.length; i++) {
    let currencyT = el.transaction[i].currency
    let priceT = new Decimal(el.transaction[i].price)
    let priceB = new Decimal(currencyB === currencyT ? 1 : kurs[currencyT][currencyB])
    minNumber =  priceT.mul(priceB).plus(minNumber)
    
  }
  return addZeroes(minNumber.dividedBy(2) / 1)
}

export let allPriceTransaction = (el, kurs, cpT, ckT) => {
  if (el.transaction.length === 0) return '---'
  
  let currencyB = el.currency
  let minNumber = new Decimal(cpT).mul(new Decimal(currencyB === ckT ? 1 : kurs[ckT][currencyB]))
    
  
  for (let i = 0; i < el.transaction.length; i++) {
    let currencyT = el.transaction[i].currency
    let priceT = new Decimal(el.transaction[i].price)
    let priceB = new Decimal(currencyB === currencyT ? 1 : kurs[currencyT][currencyB])
    minNumber =  priceT.mul(priceB).plus(minNumber)
    
  }
  console.log(minNumber / 1)
  return minNumber / 1
}

export let addZeroes = function(num) {
  var numberAsString = num.toString();

  if(numberAsString.indexOf('.') === -1) {
    num = num.toFixed(2);
    numberAsString = num.toString();
  } else  {
    num = num.toFixed(2);
    numberAsString = num.toString();
  }

  return numberAsString
};