/**
 * @author qiqingfu
 * @date 2019-09-28 14:00
 */

Function.prototype.call2 = function(context) {
  var context = context || window
  context.fn = this

  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments['+ i +']')
  }
  var result = eval('context.fn('+ args +')')
  delete context.fn
  return result
}