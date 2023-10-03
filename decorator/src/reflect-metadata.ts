import 'reflect-metadata';

// const user = {
//   name: 'Don'
// }
// Reflect.defineMetadata('data', 'test', user)

class ReflectMetadata {
  @Reflect.metadata('data', 'test')
  name = 'Don'
  @Reflect.metadata('data', 'test1')
  getName() {
    return this.name
  }
}
class father extends ReflectMetadata {
  name = 'father'
}

/**
 * Reflect.getMetadata / Reflect.getOwnMetadata 用于获取元数据
 */
// const data = Reflect.getMetadata('data', ReflectMetadata.prototype, 'name')
// const data1 = Reflect.getMetadata('data', father.prototype, 'getName')
// const data2 = Reflect.getOwnMetadata('data', father.prototype, 'getName')
// console.log(data, data1, data2) // test test1 undifined

/**
 * Reflect.hasMetadata / Reflect.hasOwnMetadata 用于判断是否存在元数据
 */
// const data = Reflect.hasMetadata('data', ReflectMetadata.prototype, 'name')
// const data1 = Reflect.hasMetadata('data', father.prototype, 'getName')
// const data2 = Reflect.hasOwnMetadata('data', father.prototype, 'getName')
// console.log(data, data1, data2) // true true false

/**
 * Reflect.getMetadataKeys / Reflect.getOwnMetadataKeys 用于获取所有元数据的 key
 */
// const data = Reflect.getMetadataKeys(ReflectMetadata.prototype, 'name')
// const data1 = Reflect.getMetadataKeys(father.prototype, 'getName')
// const data2 = Reflect.getOwnMetadataKeys(father.prototype, 'getName')
// console.log(data, data1, data2) // [ 'design:type', 'data' ] [ 'design:returntype', 'design:paramtypes', 'design:type', 'data' ] []

/**
 * Reflect.deleteMetadata 用于删除元数据
 */
// Reflect.deleteMetadata('data', ReflectMetadata.prototype, 'name')
// const data = Reflect.getMetadata('data', ReflectMetadata.prototype, 'name')
// console.log(data) // undefined
