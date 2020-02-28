// initialize
// close
class Transform {
  constructor(wrappers, target) {
    this.target = target || null;
    this.wrappers =
      Object.prototype.toString.call(wrappers) === "[object Object]"
        ? [wrappers]
        : wrappers;
  }

  perform(anyMethod) {
    this.wrappers.forEach(wrapper => wrapper.initialize.call(this.target));
    anyMethod();
    this.wrappers.forEach(wrapper => wrapper.close.call(this.target));
  }
}

module.exports = Transform;
