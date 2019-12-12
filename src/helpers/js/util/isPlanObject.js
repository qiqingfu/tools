/**
 * @author qiqingfu
 * @date 2019-08-30 18:08
 */


/**
 * @param obj {object}
 * @return {boolean}
 */

 const toStr = Object.prototype.toString;
 const hasOwn = Object.prototype.hasOwnProperty;

export function isPlanObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  const hasOwnConstructor = hasOwn.call(obj, 'construcotr')
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')

  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  let key;
  for (key in obj) {/** */}

  return key === undefined || hasOwn.call(obj, key)
}
