const getQuery = str => {
  const startIndex = str.indexOf('?');
  const endIndex = str.lastIndexOf('?');

  if (startIndex !== endIndex) {
    return url;
  }

  const queryString = str.slice(startIndex + 1);
  const map = {};

  queryString.split("&")
      .forEach(item => {
        if (item) {
          const [key, value] = item.split("=");
          map[key] = value;
        }
      });

  return  map;
};

export {
  getQuery
}
