/**
 * @author qiqingfu
 * @date 2019-08-31 12:28
 */

/**
 *
 * @param n
 * @return {boolean}
 */
export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
