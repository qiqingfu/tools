/**
 * @author qiqingfu
 * @date 2019-08-31 12:26
 */

/**
 *
 * @param obj {object}
 * @return {boolean}
 */
export function isWindow(obj) {
  return obj !== null && obj !== undefined && obj === obj.window
}
