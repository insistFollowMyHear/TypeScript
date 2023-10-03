// 类装饰器
// 装饰器本身是一个函数
// 装饰器接收的参数是类的构造函数
// 装饰器通过 @ 符号来使用
// 装饰器在类声明之前声明
// 多个装饰器从下到上依次执行

/**
 * 简单
 */

// function testDecorator(flag: boolean) {
//   if (flag) {
//     return function (constructor: any) {
//       constructor.prototype.getName = () => {
//         console.log('decorator')
//       }
//     }
//   } else {
//     return function (constructor: any) {}
//   }
// }

// @testDecorator(true)
// class Test {}

// const test = new Test();
// (test as any).getName();

/**
 * 复杂
 */

function testDecorator() {
  return function <T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "lee";
      getName() {
        return this.name;
      }
    };
  }
}

const Test = testDecorator()(
  class Test {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
)

const test = new Test("Don");
console.log(test.getName())