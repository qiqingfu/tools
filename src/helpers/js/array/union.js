/**
 *
 * @param {*Array} target
 * @param {*Array} source
 * 并集
 */
export default function union(target, source) {
  if (Array.isArray(target) && Array.isArray(source)) {
    return new Set([...target, ...source]);
  }
}
