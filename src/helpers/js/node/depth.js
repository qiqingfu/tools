/**
 * @author qiqingfu
 * @date 2020-02-14 18:54
 */

const path = require("path");
const fs = require("fs");

const resolve = dir => path.join(__dirname, dir);

const depth = (depthPath, callback) => {
  fs.access(depthPath, fs.constructor.F_OK, err => {
    if (err) {
      throw new Error(`${resolve(depthPath)} 目录不存在`);
    }

    console.log(depthPath);
    fs.readdir(depthPath, (err, files) => {
      if (err) {
        throw new Error(`api: readdir, ${err.stack}, ${err.message}`);
      }

      const STARTINDEX = 0;
      const next = index => {
        if (index >= files.length) return callback();
        const childPath = path.join(depthPath, files[index]);

        fs.stat(childPath, (err, stats) => {
          if (err) {
            throw new Error(`api: stat, ${err.stack}, ${err.message}`);
          }

          if (stats.isDirectory()) {
            depth(childPath, () => next(index + 1));
          } else {
            console.log(childPath);
            next(index + 1);
          }
        });
      };

      next(STARTINDEX);
    });
  });
};
depth("a", () => {
  console.log("深度优先遍历完成");
});
