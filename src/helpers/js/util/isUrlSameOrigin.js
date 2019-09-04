/**
 * @author qiqingfu
 * @date 2019-09-01 22:50
 */


const urlParsingNode = document.createElement('a')
const currentOrigin = resolveUrl(window.location.href)

/**
 * 判断一个 url是否为跨域
 * @param url {string}
 * @return {boolean}
 */
export function isUrlSameOrigin(url) {
  if (window.window === window) {
    const parsedOrigin = resolveUrl(url)
    return (
      parsedOrigin.protocol === currentOrigin.protocol &&
      parsedOrigin.host === currentOrigin.host
    )
  }
}

/**
 * @param url {string}
 * @return {boolean}
 */
function resolveUrl(url) {
  urlParsingNode.setAttribute('href', url)
  return {
    protocol: urlParsingNode.protocol,
    host: urlParsingNode.host
  }
}


