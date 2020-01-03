/**
 * @author qiqingfu
 * @date 2019-12-12 22:09
 */

/**
 * 简单版的深度克隆
 */

/**
 * true 深度克隆
 * target 目标对象
 * obj1   源对象
 * obj2   源对象
 * ...
 */

const toString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;

function isArray (arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr)
  }

  return toString.call(arr) === '[object Array]'
}

/**
 * obj 是否为一个 "普通" 函数
 * @param obj
 */
function isPlanObject (obj) {
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }

  /**
   * 确保不是构造函数构造出来的对象实例
   * 1. 判断当前对象的 constructor 属性是自身的还是继承而来的, 如果为普通对象, 则属性constructor 是继承的构造器原型对象上的属性
   * 2. 如果 obj 对象是通过 new 操作符构造出的实力对象, 则 obj.constructor.prototype是构造器的原型对象
   *    而构造器的原型对象自身是没有 isPrototypeOf 属性的。则会返回 false
   */
  const hasConstructor = hasOwn.call(obj, 'constructor');
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');

  if (obj.constructor && !hasConstructor) {

  }


};


export default function () {
  let target, options, i, key, copy, arr, deep;

  target = arguments[0];
  i = 1;
  deep = false;

  /**
   * 如果第一个参数为 boolean, 说明可能是深度克隆
   * 目标对象和 i 源对象下标全部向后移动一位
   */
  if (typeof target === 'boolean') {
    target = arguments[1];
    i = 2;
  }

  /**
   * 目标对象初始化
   */

};
