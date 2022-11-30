/**
 * Implement a instanceof operator using recursion.
 * @param {*} left 
 * @param {*} right 
 * @returns 
 */

function myInstanceof(left, right) {
  while (true) {
    if ((typeof (left) !== 'object' && typeof (left) !== 'function') || left === null) return false
    if (left.__proto__ === right.prototype) return true
    left = left.__proto__
  }
}

// usage example
let a = null
console.log(myInstanceof(a, Object))

let b = 123
console.log(myInstanceof(b, Object))

let c = 'xixi'
console.log(myInstanceof(c, Object))

let d = { a: 1 }
console.log(myInstanceof(d, Object))

let e = function () { }
console.log(myInstanceof(e, Object))