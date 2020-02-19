/**
 * @author qiqingfu
 * @date 2020-02-19 21:48
 */

/**
 * 对称加密
 */

const crypto = require("crypto");

const cryptoUtil = (function() {
  const key = Buffer.from("6543211234567890", "utf8");
  const iv = Buffer.from("1234567890123456", "utf8");
  const algorithm = "aes-128-cbc";

  function encryption(data) {
    let secretKey = "";
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // data 需要加密的数据
    // utf8 加密数据的字符编码
    // hex 加密后的字符编码
    secretKey += cipher.update(data, "utf8", "hex");
    secretKey += cipher.final("hex");

    return secretKey;
  }

  function decode(secretKey) {
    let data = "";
    const cipher = crypto.createDecipheriv(algorithm, key, iv);
    // secretKey 密匙
    // hex 加密后的字符编码
    // utf8 data 解密前的字符编码(还原)
    data += cipher.update(secretKey, "hex", "utf8");
    data += cipher.final("utf8");

    return data;
  }

  return {
    encryption,
    decode
  };
})();
