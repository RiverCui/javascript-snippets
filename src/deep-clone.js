/**
 * Implement a deepclone using recursion
 */

function deepClone(obj, cache = new WeakMap()) {
  if (obj instanceof Object) {  // object
    let result = undefined
    if (obj instanceof Function) {
      if (obj.prototype) {  // 普通函数
        result = function () { return obj.apply(this, arguments) }
      } else {  // 箭头函数
        result = (...args) => { return obj.call(undefined, ...args) }
      }
    } else if (obj instanceof Array) {
      result = []
    } else if (obj instanceof Date) {
      result = new Date(obj - 0)
    } else if (obj instanceof RegExp) {
      result = new RegExp(obj.source, obj.flags)
    } else {
      result = {}
    }
    if (cache.has(obj)) { return cache.get(obj) }  // 解决循环引用问题
    cache.set(obj, result)
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {  // for...in 循环会遍历原型链，这里不需要拷贝原型链上的属性
        result[key] = deepClone(obj[key], cache)
      }
    }
    return result
  } else {  // string number boolean null undefined symbol bigint
    return obj
  }
}

const a = {
  number: 1, bool: false, str: 'hi', empty1: undefined, empty2: null,
  array: [
    { name: 'frank', age: 18 },
    { name: 'jacky', age: 19 }
  ],
  date: new Date(2000, 0, 1, 20, 30, 0),
  regex: /\.(j|t)sx/i,
  obj: { name: 'frank', age: 18 },
  f1: (a, b) => a + b,
  f2: function (a, b) { return a + b }
}
a.self = a

const b = deepClone(a)

console.log(b)
console.log(b.self === b)