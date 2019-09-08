/**
 * @author qiqingfu
 * @date 2019-09-08 20:28
 */

/**
 * 封装一个 jsonp跨域方法
 * @param url
 * @param options
 */
export function jsonp(url, options) {
  return new Promise((resolve, reject) => {
    let count = 0

    let {
      jsonpCallback = 'callback',
      prefix = '__jp',
      timeout = 5000,
      params = {}
    } = options
    let name = prefix + count++
    let timer = null

    function clearup() {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
        window[name] = null
        if (timer) {
          clearTimeout(timer)
        }
      }
    }

    if (timeout) {
      timer = setTimeout(() => {
        clearup()
        reject(`request timeout ${timeout}`)
      }, timeout)
    }

    window[name] = res => {
      if (window[name]) {
        clearup()
      }
      resolve(res)
    }

    let str = ''
    for (const key in params) {
      const value = params[key] !== undefined ? params[key] : ''
      str += `&${key}=${encodeURIComponent(value)}`
    }
    url = url + (url.indexOf('?') > 0 ? '&' : '?') + str.slice(1)
    url = `${url}&${jsonpCallback}=${name}`

    const script = document.createElement('script')
    script.src = url
    document.head.appendChild(script)
  })
}
