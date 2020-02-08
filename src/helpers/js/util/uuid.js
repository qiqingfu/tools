/**
 * 生成uuid
 * @param {number} len
 * @param {object} options 配置对象
 * options:
 *  - fmt uuid类型, 若设置fmt类型, radix设置无效
 *    - n 全部为字符串数字
 *    - l 全部为小写字母 a - z
 *    - u 全部为大写字母 A - Z
 *    - n-l 组合数字和小写字母
 *    - n-u 组合数字和大写字母
 *    - l-u 组合小写字母加大写字母
 *    - 默认值为: n-l-u 组合数字+小写字母+大写字母
 *
 *  - radix uuid进制数, 最大值为62,大于62报错。默认值为62
 *
 *
 * // 写着玩, 扩展性不强。不如把chars分为三块 n、l、u
 */
export default function uuid(len, options = {}) {
  const char = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let uuid = [],
    i,
    chars = char.split(""),
    l = chars.length;

  let { fmt, radix } = options;

  radix = radix || l;

  const strategyFunc = () => {
    return {
      strategy: {
        n: function() {
          return char.substr(0, 10);
        },
        l: function() {
          return char.substr(10, 26);
        },
        u: function() {
          console.log(char.substr(36, 26), "u function");
          return char.substr(36, 26);
        },
        "n-l": function() {
          return this.n() + this.l();
        },
        "n-u": function() {
          return this.n() + this.u();
        },
        "l-u": function() {
          return this.l() + this.u();
        },
        "l-n-u": function() {
          return this.l() + this.n() + this.u();
        },
        default() {
          return this["l-n-u"]();
        }
      },
      strategyTransForm: {
        1(fmt) {
          return fmt[0];
        },
        2(fmt) {
          const o = {
            "n-l": "n-l",
            "l-n": "n-l",
            "n-u": "n-u",
            "u-n": "n-u",
            "l-u": "l-u",
            "u-l": "l-u"
          };

          let r;
          if ((r = o[fmt.join("-")])) {
            return r;
          }

          return this.default();
        },
        3(fmt) {
          const o = ["l-n-u", "l-u-n", "n-l-u", "n-u-l", "u-l-n", "u-n-l"];
          if (o.indexOf(fmt.join("-")) !== -1) {
            return o[0];
          }

          return this.default();
        },
        default() {
          return "l-n-u";
        }
      },
      transform(fmt, fn) {
        fmt = fmt.split("-");
        const straTransFunc =
          this.strategyTransForm[fmt.length] ||
          this.strategyTransForm["default"];
        const res = straTransFunc(fmt);
        this.verify(res, fn);
      },
      verify(fmt, fn) {
        Object.keys(this.strategy).some(k => {
          if (k === fmt) {
            fn(k);
            return true;
          }

          return false;
        });
      }
    };
  };

  const strategyFuncObject = strategyFunc();
  const { strategy, transform } = strategyFuncObject;

  if (fmt && typeof fmt === "string") {
    transform.call(strategyFuncObject, fmt, f => {
      fmt = f;
      chars = strategy[fmt]().split("");
      radix = chars.length;
    });
  } else if (radix > l) {
    throw new Error(`最大值限制为 ${l}`);
  }

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // 默认生成
    let r,
      defaultLen = 36;

    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < defaultLen; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * defaultLen);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}
