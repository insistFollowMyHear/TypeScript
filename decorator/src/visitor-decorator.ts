function visitorDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false;
}

class Visitor {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  // 不能向多个同名的 get/set 访问器应用修饰器
  get name() {
    return this._name;
  }
  @visitorDecorator
  set name(name: string) {
    this._name = name;
  }
}

const visitor = new Visitor('Dell');
console.log(visitor.name);