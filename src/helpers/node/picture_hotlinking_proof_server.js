/**
 * 图片防止盗取, 只有本服务器域名和白名单的域名可以加载当前服务器的图片资源
 */

const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const server = http.createServer();

// 设置访问服务器图片的白名单服务器
const whiteList = new Set(["xxxx", "xxxx"]);

server.on("request", function(req, res) {
  const { hostname, pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/favicon.ico") {
    res.end("");
    return;
  }

  const filePath = path.join(
    __dirname,
    pathname === "/" ? "index.html" : pathname
  );

  const referer = req.headers.referer;
  if (referer) {
    const { hostname: refererHostName } = new URL(req.headers.referer);
    // 外链
    if (refererHostName !== hostname && !whiteList.has(refererHostName)) {
      fs.createReadStream(path.join(__dirname, "error.png")).pipe(res);
      return;
    }
  }

  fs.createReadStream(filePath).pipe(res);
});

server.listen(8081, function() {
  console.log("已开启服务");
});
