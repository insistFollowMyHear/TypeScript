// 普通方法，target 对应的是类的 prototype
// 静态方法，target 对应的是类的构造函数

function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target, key);
  // descriptor.writable = true;
  descriptor.value = function() {
    return 'decorator';
  };
}

class Method {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age
  }
  @getNameDecorator
  getName() {
    console.log(this.name, '-------')
    return this.name + this.age;
  }
  getAge() {
    return this.age;
  }
}

const method = new Method("Dong", 12)
console.log(method.getName())