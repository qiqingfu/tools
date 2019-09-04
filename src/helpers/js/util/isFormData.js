/**
 * @author qiqingfu
 * @date 2019-09-04 23:48
 */

/**
 * 检测一个值是不是 formData类型
 * @param val any
 * @return {boolean}
 */
export function isFormData(val) {
  return typeof val !== 'undefined' && val instanceof FormData
}
