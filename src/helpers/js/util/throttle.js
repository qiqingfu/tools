/**
 * 函数节流
 * 原理: 持续触发事件, 每隔一段事件, 只执行一次事件
 * 通过第三个 options 参数配置首次和结束是否执行
 * 
 * @param {Function} func 
 * @param {Number*} wait 
 * @param {Object*} options 
 * @param {Boolean*} start
 * @param {Boolean*} end
 */
 const throttle = (func, wait = 300, options = {}) => {
  let context, timer, args;

  // 记录上一次的时间戳, 初始为0
  let previous = 0

  // 定时执行的定时器函数
  const later = function () {
    previous = options.start === false ? 0 : + new Date()
    timer = null
    func.apply(context, args)
    if (timer) context = args = null
  }

  return function () {

    // 每次触发事件, 获取一次最新的时间戳
    let now = + new Date()

    // 不立即执行的情况下, 将 previous 更新为最新的时间戳
    if (!previous && options.start === false) previous = now

    /**
     * 不立即执行的情况下
     *  1. 如果首次不立即执行, diff 计算后的结果和 wait 保持一致
     *  2. 再次触发事件时, previous 保持之前的时间戳, now为最新的时间戳
     *  3. diff 的值逐渐变小, 直到 <=0
     */
    let diff = wait - (now - previous)
    context = this
    args = arguments
    if (diff <= 0 || diff > wait) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }

      // 更新为上一次的时间戳
      previous = now
      func.apply(func, args)
      if (!timer) context = args = null
    } else if (!timer && options.end !== false) {
      timer = setTimeout(later, diff)
    }
  }
 }