/**
 * @Author: qiqf
 * @Date: 2020-02-23 20:01:55
 */

/**
 * 流动模式下的可读流
 * FlowingReadable Stream
 */

const EventEmitter = require("events");
const fs = require("fs");

class FlowingReadable extends EventEmitter {
  /**
   *
   * @param {string} path 读取文件的路径
   * @param {Object} options 配置选项
   *   flags: 默认值 'r'
   *   encoding: 默认值 null
   *   mode: 默认值 0o666
   *   autoClose: 默认值 true
   *   start 默认值 0
   *   end 默认值 Infinity
   *   highWaterMark 默认值 64 * 1024
   */
  constructor(path, options) {
    // 初始化子实例
    super(path, options);

    this.path = path;
    this.flags = options.flags || "r";
    this.encoding = options.encoding;
    this.mode = options.mode || 0o666;
    this.autoClose = options.autoClose || true;
    this.pos = this.start = options.start || 0;
    this.end = options.end || Infinity;
    this.highWaterMark = options.highWaterMark || 64 * 1024;
    this.buffer = Buffer.alloc(this.highWaterMark);
    this._open = false;

    /**
     * 可读流三种状态
     * - null 目前没有数据消费者, 所以不会从资源库中读取数据
     * - false 暂停从资源库读取数据
     * - true 正在从资源库读取数据
     */
    this.flowing = null;

    this.open();

    // EventEmitter 实例在新的监听器被添加到其内部监听器数组之前
    // 会触发自身的 newListener 事件
    this.on("newListener", (eventName, handler) => {
      if (eventName === "data") {
        this.flowing = true;
        this.read();
      }
    });
  }

  /**
   * 根据提供的 path打开读取的文件
   * 获取文件 fd
   */
  open() {
    fs.open(this.path, this.flags, this.mode, (err, fd) => {
      if (err) {
        if (this.autoClose) {
          this.destory();
          return this.emit("error", err);
        }
      }

      this.fd = fd;
      this._open = true;
      this.emit("open");
    });
  }

  /**
   * 关闭文件
   */
  destory() {
    fs.close(this.fd, () => {
      this._open = false;
      this.flowing = null;
      this.emit("close");
    });
  }

  /**
   * 读取文件数据
   */
  read() {
    // 确保指定的 path 路径的文件已经打开了
    if (!this._open && typeof this.fd !== "number") {
      return this.once("open", () => this.read());
    }

    /**
     * 计算 howMuchToRead,要读取的字节数
     */
    const howMuchToRead = this.end
      ? Math.min(this.end - this.pos + 1, this.highWaterMark)
      : this.highWaterMark;

    fs.read(
      this.fd,
      this.buffer,
      0,
      howMuchToRead,
      this.pos,
      (err, bytesRead) => {
        if (err) {
          if (this.autoClose) {
            this.destory();
            this.emit("error", err);
          }
        }

        if (bytesRead) {
          // 要通过 data 事件发送出的数据
          let data = this.buffer.slice(0, bytesRead);
          if (this.encoding) {
            data = data.toString(this.encoding);
          }

          this.emit("data", data);

          // 更新下一次读取的位置
          this.pos += bytesRead;
          if (this.end && this.end < this.pos) {
            return this.endFn();
          } else {
            if (this.flowing) {
              this.read();
            }
          }
        } else {
          return this.endFn();
        }
      }
    );
  }

  endFn() {
    this.emit("end");
    this.destory();
  }

  /**
   * 暂停读取
   */
  pause() {
    this.flowing = false;
  }

  /**
   * 暂停的可读流恢复触发 data 事件
   */
  resume() {
    this.flowing = true;
    this.read();
  }

  pipe(writeable) {
    this.on("data", data => {
      const flag = writeable.write(data);
      if (!flag) {
        this.pause();
      }

      writeable.on("drain", () => {
        this.resume();
      });
    });
  }
}

module.exports = FlowingReadable;
