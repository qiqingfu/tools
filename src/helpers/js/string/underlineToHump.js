const underlineToHump = (str) => {
  return str.replace(/(_(\w)?)/g, ($0) => $0.slice(1).toUpperCase());
};

export default underlineToHump;
