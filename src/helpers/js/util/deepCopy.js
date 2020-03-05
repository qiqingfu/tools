import { type } from "/type.js";

/**
 * @param {*any} obj
 */
export default function deepCopy(data) {
  const t = type(data);
  let o;

  if (t === "array") {
    o = [];
  } else if (t === "object") {
    o = {};
  } else {
    return data;
  }

  if (t === "array") {
    for (let i = 0; i < data.length; i++) o.push(deepCopy(data[i]));
  } else if (t === "object") {
    for (let k in data) {
      o[k] = deepCopy(data[k]);
    }
  }

  return o;
}
