// 实战
const person: any = undefined;

function catchError(errMsg: string) {
  return function (targe: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function() {
      try {
        fn();
      } catch (err) {
        console.log(errMsg);
      }
    }
  }
}

class Person {
  constructor() {}
  @catchError('person.name 不存在')
  getName() {
    return person.name;
  }
  @catchError('person.age 不存在')
  getAge() {
    return person.age;
  }
}

const p = new Person();
p.getName()
p.getAge()