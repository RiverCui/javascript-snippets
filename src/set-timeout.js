/**
 * Implement setTimeout using setInterval
 */

function cSetTimeout(fn, t) {
  const timer = setInterval(() => {
    clearInterval(timer)
    fn()
  }, t)
}

// Test case
let a = cSetTimeout(() => {
  console.log('111')
}, 1000)