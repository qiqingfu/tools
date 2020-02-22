/**
 * 多语言服务器
 * 服务器要配置对应的语言包
 * 支持中文 zh-cn 和 en-us 两种语言
 */

const http = require("http");

const server = http.createServer();

const languagePack = {
  "zh-cn": {
    title: "当前支持的是中文!"
  },
  "en-us": {
    title: "english is currently supported!"
  },
  default: "zh-cn"
};

/**
 *
 * 解析 accept-language头字段
 * @param {String} acceptLanguage 请求头部的语言信息
 */
function formatLanguage(acceptLanguage) {
  if (!acceptLanguage) {
    return [
      {
        l: languagePack["default"],
        q: 1
      }
    ];
  }

  let langGroups = acceptLanguage.split(",");

  return langGroups
    .map(langDesc => {
      let lq = langDesc.split(";");

      if (lq.length === 2) {
        lq.splice(1, 0, +lq.pop().split("=")[1]);
      }

      if (lq.length === 1) {
        lq.push(1);
      }

      return {
        l: lq[0].toLowerCase(),
        q: lq[1]
      };
    })
    .sort((a, b) => b.q - a.q);
}

server.on("request", function(req, res) {
  const acceptLanguage = req.headers["accept-language"];
  const languageInfo = formatLanguage(acceptLanguage);

  let pack = {};
  languageInfo.some(({ l }) => {
    if (languagePack[l]) {
      pack = Object.assign(languagePack[l], { l });
      return true;
    }

    return false;
  });

  res.setHeader("Content-Language", pack.l);
  res.setHeader("Content-Type", "text/html;charset=utf8");
  res.end(pack.title);
});

server.listen(8081, function() {
  console.log("port: 8081");
});
