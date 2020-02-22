/**
 * 流形式写入一个大文件
 * 代码有点问题
 */

const fs = require("fs");
const path = require("path");

/**
 *
 * @param {string} filePath 创建大文件的路径
 * @param {number} size 字节
 */
function createBigFile(filePath, size, callback) {
  let buffer = Buffer.allocUnsafe(size * 1024);
  let len = Buffer.byteLength(buffer);

  // 可写流
  let writable = fs.createWriteStream(path.join(__dirname, filePath));
  let ok = true;

  function write() {
    while (len-- > 0 && ok) {
      if (len === 0) {
        writable.write(buffer, callback);
      } else {
        ok = writable.write(buffer);
      }
    }
    if (len > 0) {
      writable.once("drain", write);
    }
  }

  write();
}
