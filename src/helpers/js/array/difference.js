/**
 *
 * @param {*Array} target
 * @param {*Array} sources
 * @returns {Set}
 */
export default function difference(target, source) {
  const t = new Set(target);
  const s = new Set(source);

  return new Set([...t].filter(e => !s.has(e)));
}
