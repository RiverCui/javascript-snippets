/**
 * Implementing a promise in JavaScript
 */

class myPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  constructor(func) {
    this.PromiseState = myPromise.PENDING
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
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.FULFILLED
      this.PromiseResult = result
      this.onFulfilledCallbacks.forEach(callback => {
        callback(result)
      })
    }
  }
  reject(reason) {
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED
      this.PromiseResult = reason
      this.onRejectedCallbacks.forEach(callback => {
        callback(reason)
      })
    }
  }
  then(onFulfilled, onRejected) {
    const promise2 = new myPromise((resolve, reject) => {
      if (this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if(typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult)
            } else {
              let x = onFulfilled(this.PromiseResult)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch(e) {
            reject(e)
          }
        })
      } else if (this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            if(typeof onRejected !== 'function') {
              reject(this.PromiseResult)
            } else {
              let x = onRejected(this.PromiseResult)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch(e) {
            reject(e)
          }
        })
      } else if (this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if(typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult)                
              } else {
                let x = onFulfilled(this.PromiseResult)
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch(e) {
              reject(e)
            }
          })
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if(typeof onRejected !== 'function') {
                reject(this.PromiseResult)
              } else {
                let x = onRejected(this.PromiseResult)
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch(e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}

/**
 * 
 * @param {promise} promise2  promise1.then 方法返回的新的 promise 对象 
 * @param {[type]} x          promise1 中 onFulfilled 或 onRejected 的返回值
 * @param {[type]} resolve    promise2 的 resolve 方法
 * @param {[type]} reject     promise2 的 reject 方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  if(x === promise2) {
    throw new TypeError('Chaining cycle detected for promise')
  }

  if(x instanceof myPromise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject)
    }, reject)
  } else if(x !== null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      var then = x.then
    } catch(e) {
      return reject(e)
    }

    if(typeof then === 'function') {
      let called = false
      try {
        then.call(
          x,
          y => {
            if(called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            if(called) return
            called = true
            reject(r)
          }
        )
      } catch(e) {
        if(called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    return resolve(x)
  }
}

// usage example
// console.log(1)
// let promise1 = new myPromise((resolve, reject) => {
//   console.log(2)
//   setTimeout(() => {
//     console.log('A', promise1.PromiseState);
//     resolve('嘻嘻嘻')
//     console.log('B', promise1.PromiseState);
//     console.log(4)
//   })
// })
// promise1.then(
//   result => {
//     console.log('C', promise1.PromiseState);
//     console.log('fulfilled', result)
//   },
//   reason => {
//     console.log('rejected', reason)
//   }
// )
// console.log('3')

myPromise.deferred = function () {
  let result = {};
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
}

module.exports = myPromise;
