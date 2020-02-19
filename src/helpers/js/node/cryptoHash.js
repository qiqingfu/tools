const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const readFileStream = function(filePath) {
  return fs.createReadStream(path.join(__dirname, filePath));
};

/**
 *
 * @param {string} filePath
 * 摘要算法, 单向加密, filePath是文件的路径
 */
const cryptoFunc = function(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    readFileStream(filePath)
      .on("data", function(chunk) {
        hash.update(chunk.toString());
      })
      .on("end", function() {
        res = hash.digest("hex");
        resolve(res);
      })
      .on("error", function(err) {
        reject(err);
      });
  });
};
