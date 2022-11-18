/**
 * Implementing a promise in JavaScript
 */

class cPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(func) {
    this.PromiseState = cPromise.PENDING
    this.PromiseResult = null
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch(error) {
      this.reject(error)
    }
  }
  resolve(result) {
    if(this.PromiseState === cPromise.PENDING) {
      this.PromiseState = cPromise.FULFILLED
      this.PromiseResult = result
    }
  }
  reject(reason) {
    if(this.PromiseState === cPromise.PENDING) {
      this.PromiseState = cPromise.REJECTED
      this.PromiseResult = reason
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    if(this.PromiseState === cPromise.FULFILLED) {
      onFulfilled(this.PromiseResult)
    }
    if(this.PromiseState === cPromise.REJECTED) {
      onRejected(this.PromiseResult)
    }
  }
}

// usage example
let promise1 = new cPromise((resolve, reject) => {
  throw new Error('xxx')
})
promise1.then(
  undefined,
  reason => {
    console.log(reason.message)
  }
)