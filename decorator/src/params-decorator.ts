// 原型，方法名，参数所在的位置
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex);
}

class Parameter {
  getInfo(name: string, @paramDecorator age: number) {
    console.log(name, age);
  }
}

const parameter = new Parameter();
parameter.getInfo('Don', 26);
