/**
 * Implement call/apply/bind method
 */

// call
Function.prototype.myCall = function(thisArg, ...args) {
  thisArg = (thisArg !== undefined && thisArg !== null) ? Object(thisArg) : window
  let fn = Symbol()
  thisArg[fn] = this
  return thisArg[fn](...args)
}


// usage example
function sum(a,b) {
  return `my name is ${this.name},and I'm ${a+b} years old`
}
sum.myCall({name: 'River'}, 3, 15)


// apply
Function.prototype.myApply = function(thisArg, argArray) {
  thisArg = (thisArg !== null && thisArg !== undefined) ? Object(thisArg) : window
  let fn = Symbol()
  thisArg[fn] = this
  return thisArg[fn](...(argArray || []))
}

// usage example
function sum(a,b) {
  return `my name is ${this.name},and I'm ${a+b} years old`
}
sum.myApply({name: 'River'}, [3, 15])


// bind

