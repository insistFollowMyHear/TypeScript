import 'reflect-metadata';

function showData(constructor: typeof User) {
  const methodNames = Object.getOwnPropertyNames(constructor.prototype);
  for (let methodName of methodNames) {
    if (methodName !== 'constructor') {
      const data = Reflect.getMetadata('data', constructor.prototype, methodName);
      console.log(data);
    }
  }
}

@showData
class User {
  public name: string;
  constructor() {
    this.name = 'xiaoming';
  }
  @Reflect.metadata('data', 'name')
  getName() {}
  @Reflect.metadata('data', 'age')
  getAge() {}
}