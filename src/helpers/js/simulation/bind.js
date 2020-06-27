/**
 * @author qiqingfu
 * @date 2019-09-28 14:00
 */

(function () {
  if (!Function.prototype.mockBind) {
    Function.prototype.mockBind = function (oThis) {
      if (typeof this !== "function") {
        throw new TypeError(
          "Function.prototype.mockBind - what is trying" +
            "to be bound is not callable"
        );
      }

      let aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
          return fToBind.apply(
            this instanceof fNOP && oThis ? this : oThis,
            aArgs.concat(Array.prototype.slice.call(arguments))
          );
        };

      fNOP.prototype = this.prototype;
      fBound.prototype = new fNOP();

      return fBound;
    };
  }
})();
