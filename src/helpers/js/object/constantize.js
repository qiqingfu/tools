/**
 * @author qiqingfu
 * @date 2020-03-17 22:05
 */

/**
 * 深度冻结一个对象
 * @param obj
 */
export default function constantize(obj) {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
      constantize(obj[key]);
    }
  });
};
