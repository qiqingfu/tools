/**
 * 函数防抖
 * 原理: 尽管触发事件, 一定在事件触发 n 秒后才执行, 如果一个事件触发的 n 秒内又触发了这个事件
 * 就以新的事件的事件为准, n 秒后才执行
 * 修正 this 指向和 event事件对象
 */

const debounce = (func, wait = 300, immediate = false) => {
  let timer, context, args

  /**
   * 返回一个闭包函数, 将 timer、context、args变量保存在 debounce 函数的作用域中
   */
  const debounce = function () {
    context = this
    args = arguments

    if (timer) clearTimeout(timer)

    if (immediate) {
      let nowExec = !timer
      timer = setTimeout(function () {
        timer = null
      }, wait)
      nowExec && func.apply(context, args)
    } else {
      timer = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }
  }

  debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounce
}