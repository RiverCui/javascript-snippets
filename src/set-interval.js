/**
 * setInterval() method have some disadvantages, try to implement setInterval with setTimeout. 
 */

function cSetInterval(fn, t) {
  let timer = null
  function interval() {
    fn()
    timer = setTimeout(interval, t)
  }
  interval()
  return {
    cancel: () => {
      clearTimeout(timer)
    }
  }
}

// Test case
let a = cSetInterval(() => {
  console.log('111')
}, 1000)
let b = cSetInterval(() => {
  console.log('222')
}, 1000)

setTimeout(() => {
  a.cancel()
}, 3000)
setTimeout(() => {
  b.cancel()
}, 6000)