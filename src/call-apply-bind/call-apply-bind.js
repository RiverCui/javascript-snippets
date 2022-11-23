/**
 * Implement call/apply/bind method
 */

// call
Function.prototype.myCall = function (thisArg, ...args) {
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  let fn = Symbol()
  thisArg[fn] = this // this 隐式绑定
  return thisArg[fn](...args)
}

// usage example
function sum(a, b) {
  console.log(`my name is ${this.name},and I'm ${a + b} years old`)
}

sum.myCall({ name: 'River' }, 3, 15)


// apply
Function.prototype.myApply = function (thisArg, argArray) {
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  let fn = Symbol()
  thisArg[fn] = this
  return thisArg[fn](...(argArray || [])) // 考虑空集的情况
}

// usage example
sum.myApply({ name: 'River' }, [3, 15])


// bind
Function.prototype.myBind = function (thisArg, ...argArray) {
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  return (...args) => {
    let fn = Symbol()
    thisArg[fn] = this
    return thisArg[fn](...[...argArray, ...args])
  }
}

// usage example
function sum2(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4)
}

let newSum = sum2.bind('abc', 10, 20)
newSum(30, 40)
