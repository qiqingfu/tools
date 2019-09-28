/**
 * @author qiqingfu
 * @date 2019-09-28 14:00
 */

Function.prototype.apply2 = function(context, arrs) {
  var context = context || window
  context.fn = this
  var result
  if (!arrs) {
    result = context.fn()
  } else {
    var args = []
    for (var i = 0; i < arrs.length; i++) {
      args.push('arrs['+ i +']')
    }
    result = eval('context.fn('+ args +')')
  }

  delete context.fn
  return result
}