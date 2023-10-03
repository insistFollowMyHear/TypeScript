function push(array: any[], ...items: any[]) {
  console.log(items, '---------------')
  items.forEach(function(item) {
      array.push(item)
  })
}

let a: any[] = []
push(a, 2, 3, 4)