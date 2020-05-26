/**
 * 工具函数
 * 深度克隆一个对象或数组, 并且使用 cache 缓存
 */

/**
 * 返回一个数组中符合 f 函数的第一项
 * @param list
 * @param f
 */
const find = function (list, f) {
  return list.filter(f)[0]
}

/**
 * 遍历一个对象或数组的 key 和 value
 * 并且传递给 fn 回调函数
 * @param obj
 * @param fn
 */
const forEachValue = function (obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

/**
 * 一个对象的深度克隆
 * @param obj
 * @param cache
 * @returns {[]|{}|ClipboardEvent|*}
 */
const deepCopy = function (obj, cache = []) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  cache.push({
    original: obj,
    copy
  })

  forEachValue(obj, (value, key) => {
    copy[key] = deepCopy(value, cache)
  })

  return copy
}
