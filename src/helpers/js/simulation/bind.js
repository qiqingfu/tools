/**
 * @author qiqingfu
 * @date 2019-09-28 14:00
 */

Function.prototype.bind2 = function(context) {
  var context = context || window
  // 保存出了 context的剩余参数
  var args = Array.prototype.slice.call(arguments, 1)
  var self = this

  function MiddleLayer() {}
  // 调用 bind 返回的新闭包函数
  var bindResultFunc = function() {
    var bindArgs = Array.prototype.slice.call(arguments)

    // 需要判断 bindResultFunc 函数是否被一元操作符 new 使用
    // instanceof 来检测 this 是不是 bindResultFunc的实例
    self.apply(this instanceof bindResultFunc ? this : context, args.concat(bindArgs))
  }

  MiddleLayer.prototype = this.prototype
  bindResultFunc.prototype = new MiddleLayer()

  return bindResultFunc
}