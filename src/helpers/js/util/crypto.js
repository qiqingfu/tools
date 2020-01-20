const crypto = require('crypto');
const iv = crypto.randomBytes(128/8);

module.exports = {
  // symmetric encrypted data
  encryption(data) {
    const key = crypto.randomBytes(192/8);
    let enc = '';
    let cipher = crypto.createCipheriv('aes192', key, iv);
    enc += cipher.update(data, 'utf-8', 'hex');
    enc += cipher.final('hex');

    return {
      enc,
      key
    };
  },
  // symmetric decryption data
  decryption(data, key) {
    let decipher = crypto.createDecipheriv('aes192', key, iv);
    let dec = decipher.update(data, 'hex', 'utf-8');
    dec += decipher.final('utf-8');

    return dec;
  }
}