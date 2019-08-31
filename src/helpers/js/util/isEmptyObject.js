/**
 * @author qiqingfu
 * @date 2019-08-31 12:50
 */

/**
 * 检测一个对象是否为空 (包括可枚举的属性)
 * 可枚举: 是否可以通过 for in 或 Object.keys() 遍历出来
 */

/**
 * @param obj {object}
 * @return {boolean}
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0
}
