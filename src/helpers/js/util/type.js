/**
 * @author qiqingfu
 * @date 2019-08-30 18:16
 */

export function type(item) {
  const reTypeOf = /(?:^\[object\s(.*?)\]$)/
  return Object.prototype.toString.call(item)
    .replace(reTypeOf, '$1')
    .toLowerCase()
}
