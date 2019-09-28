/**
 * @author qiqingfu
 * @date 2019-09-19 11:45
 */

/**
 * @param params {string}
 * @returns boolean
 */
export function isURLSearchParams(params) {
  return typeof params !== "undefined" && params instanceof URLSearchParams
}