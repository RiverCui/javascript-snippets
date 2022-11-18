/**
 * Get an array with unique values
 */

// 1. use ES6 [...new Set()]
// function uniqueArray(a) {
//   // return [...new Set(a)]
//   // or
//   return Array.from(new Set(a))
// }

// usage example
// let arr = [1,2,2,3,4,5,5,6]
// const arr2 = uniqueArray(arr)
// console.log(arr2)
// let str = "foo"
// const str2Arr = uniqueArray(str)
// console.log(str2Arr)


// 2. use ES6 filter
let arr = ['a', 1, 'a', 2, 2]
let arr2 = arr.filter((v, i, a) => a.indexOf(v) === i)
console.log(arr2)


// 3. use array
// function uniqueArray(a) {
//   let map = {}
//   for(i=0; i<a.length; i++) {
//     let number = a[i]
//     if(number === undefined) continue
//     if(number in map) continue
//     map[number] = number
//   }
//   return Object.values(map)
// }

// // usage example
// let arr = [{a:1, b:2}, 1, {a:1, b:2}, 2, 2]
// let arr2 = uniqueArray(arr)
// console.log(arr2)
