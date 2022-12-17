/**
 * Implement a new operator.
 */

function myNew(fn, ...args) {
    let obj = Object.create(fn.prototype)
    // 传入参数，绑定 this，获取构造函数的返回结果
    let res = fn.call(obj, ...args)
    return (res && (typeof res === 'object' || typeof res === 'function')) ? res : obj
}

// usage example
function Person(name, age) {
    this.name = name
    this.age = age
    return { name: 'River' }
}

Person.prototype.say = function () {
    console.log(`Hello, I'm ${this.name}!`)
}

let jack = new Person('Jack', 18)
// jack.say()
console.log(jack)