function valueDecorator(target: any, key: string): any {
  // const descriptor: PropertyDescriptor = {
  //   writable: false
  // }
  // return descriptor;
  target[key] = 'lee';
}

// 修改的并不是实例上的 name， 而是原型上的 name
class Value {
  @valueDecorator
  name: string;
  constructor(name: string) {
    this.name = name
  }
}

const value = new Value('Dell');
console.log((value as any).__proto__.name)