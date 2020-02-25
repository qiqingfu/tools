/**
 * @author qiqingfu
 * @date 2020-02-25 17:52
 */

const isArray = function (data) {
  if (Array.isArray) {
    return Array.isArray(data);
  }

  return Array.prototype.toString.call(data) === '[object Array]';
};

const validate = function (data) {
  if (!isArray(data)) {
    throw new Error(`Data type error. The expectation is an array`);
  }
};

function iterator(obj) {
  validate(obj);
  let current = 0;

  const next = function () {
    current++;
  };

  const done = function () {
    return current === obj.length;
  };

  const getVal = function () {
    return obj[current];
  };

  return {
    next,
    done,
    getVal,
    length: obj.length
  };
}

function compare(iteratorSource, iteratorTarget) {
  let result = true;
  if (iteratorSource.length !== iteratorTarget.length) {
    return !result;
  }

  while (!iteratorSource.done() && !iteratorTarget.done()) {
    if (iteratorSource.getVal() !== iteratorTarget.getVal()) {
      result = false;
      break;
    }
    iteratorSource.next();
    iteratorTarget.next();
  }

  return result;
}

export default function (source, target) {
  return compare(iterator(source), iterator(target));
};
