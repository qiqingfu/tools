const Type = (() => {
  const typeList = [
    "String",
    "Number",
    "Boolean",
    "Function",
    "Object",
    "Array",
    "Null",
    "Date"
  ];

  const type = {};

  for (let i = 0; i < typeList.length; i++) {
    const val = typeList[i];
    type[`is${val}`] = obj => {
      return Array.prototype.toString.call(obj) === `[object ${val}]`;
    };
  }

  return type;
})();

export default Type;
