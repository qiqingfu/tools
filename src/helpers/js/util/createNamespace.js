const createNamespace = function (obj) {
  return function (name) {
    let parts = name.split(".");
    let current = obj;
    for (let i = 0; i < parts.length; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }

      current = current[parts[i]];
    }
  };
};
