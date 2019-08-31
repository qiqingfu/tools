/**
 * @author qiqingfu
 * @date 2019-08-30 18:08
 */

/**
 * 判断一个对象是不是通过 {} 字面量或 new Object()创建的
 */

/**
 * @param obj {object}
 * @return {boolean}
 */
export function isPlanObject(obj) {
  if (typeof (obj) !== "object" || obj === null || obj === undefined || obj === obj.window || obj.nodeType) {
    return false
  }
  return !(obj.constructor
    && !Object.prototype.hasOwnProperty.call(obj.constructor.prototype, 'isPrototypeOf'));
}
