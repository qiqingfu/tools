/**
 *
 * @param {*Array} target
 * @param {*Array} source
 * @returns {Set}
 */
export default function intersect(target, source) {
  const t = new Set(target);
  const s = new Set(source);

  return new Set([...t].filter(e => s.has(e)));
}
