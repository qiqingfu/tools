/**
 * @author qiqingfu
 * @date 2019-08-31 12:34
 */

/**
 * 检查一个函数可以使用 typeof 一元操作符
 * Generator 也是一个个函数
 */

/**
 *
 * @param item {function}
 * @return {boolean}
 */
export function isFunction(item) {
  if (typeof item === 'function') {
    return true
  }
  const type = Object.prototype.toString.call(item)
  return type === '[object Function]' || type === '[object GeneratorFunction]'
}
