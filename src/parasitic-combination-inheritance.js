/**
 * parasitic combination inheritance
 * 寄生组合式继承
 */

function Parent(name) {
  this.name = name
  this.num = [0, 1, 2]
}

Parent.prototype.sayName = function() {
  console.log('Hello, this is ' + this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child

// instance 1
const boy = new Child('Tom', 22)

boy.num.push(3)
console.log(boy.num)
boy.sayName()

// instance 2
const girl = new Child('Lisa', 18)

console.log(girl.num)
girl.sayName()