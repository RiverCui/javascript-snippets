function quickSort(arr) {
  if(arr.length<2) return arr
  const cur = arr[arr.length -1]
  const left = arr.filter((value, index) => value <= cur && index !== arr.length-1)
  const right = arr.filter((value) => value > cur)
  return [...quickSort(left), cur, ...quickSort(right)]
}

console.log(quickSort([3, 6, 2, 4, 1]));
