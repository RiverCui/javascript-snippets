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
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(result) {
    if (this.PromiseState === cPromise.PENDING) {
      this.PromiseState = cPromise.FULFILLED
      this.PromiseResult = result
      this.onFulfilledCallbacks.forEach(callback => {
        callback(result)
      })
    }
  }
  reject(reason) {
    if (this.PromiseState === cPromise.PENDING) {
      this.PromiseState = cPromise.REJECTED
      this.PromiseResult = reason
      this.onRejectedCallbacks.forEach(callback => {
        callback(reason)
      })
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    if (this.PromiseState === cPromise.PENDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          onFulfilled(this.PromiseResult)
        })
      })
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          onRejected(this.PromiseResult)
        })
      })
    }
    if (this.PromiseState === cPromise.FULFILLED) {
      setTimeout(() => {
        onFulfilled(this.PromiseResult)
      })
    }
    if (this.PromiseState === cPromise.REJECTED) {
      setTimeout(() => {
        onRejected(this.PromiseResult)
      })
    }
  }
}

// usage example
console.log(1)
let promise1 = new cPromise((resolve, reject) => {
  console.log(2)
  setTimeout(() => {
    console.log('A', promise1.PromiseState);
    resolve('嘻嘻嘻')
    console.log('B', promise1.PromiseState);
    console.log(4)
  })
})
promise1.then(
  result => {
    console.log('C', promise1.PromiseState);
    console.log('fulfilled', result)
  },
  reason => {
    console.log('rejected', reason)
  }
)
console.log('3')

const promise = new cPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 2000);
})
promise.then(value => {
  console.log(1)
  console.log('resolve', value)
})
promise.then(value => {
  console.log(2)
  console.log('resolve', value)
})
promise.then(value => {
  console.log(3)
  console.log('resolve', value)
})