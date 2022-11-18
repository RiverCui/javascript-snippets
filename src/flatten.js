/**
 * Reduce the dimensionality of an array.
 */

// using reduce method
// 1. Recursion 递归
// function flatten(a) {
//   if(!a.length) return
//   return a.reduce(
//     (pre, cur) =>
//       Array.isArray(cur) ? [...pre, ...flatten(cur)] : [...pre, cur],
//       []  // init value
//   )
// }


// 2. Iteration 迭代
function flatten(a) {
  if(!a.length) return
  while(a.some(item => Array.isArray(item))) {
    a = [].concat(...a)
  }
  return a
}

// usage example
let arr = [1, 2, 3, [1, [2, [3, [4, [5]]]]]]
let arr2 = flatten(arr)
console.log(arr2)