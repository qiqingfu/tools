/**
 * 判断操作系统是否支持给定的 fontFamily 字体
 * @param {string} fontFamily - A string param 
 */
export const isSupportFontFamily = (fontFamily: string): boolean => {
  const arial = 'Arial'
  if (fontFamily.toLowerCase() === arial.toLowerCase()) return true

  const size = 100
  const width = 100
  const height = 100
  const str = 'a'

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return false

  canvas.width = width
  canvas.height = height
  ctx.textAlign = 'center'
  ctx.fillStyle = 'black'
  ctx.textBaseline = 'middle'

  const getDotArray = (_fontFamily: string) => {
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${size}px ${_fontFamily}, ${arial}`
    ctx.fillText(str, width / 2, height / 2)
    const imageData = ctx.getImageData(0, 0, width, height).data
    return [].slice.call(imageData).filter(item => item !== 0)
  }

  return getDotArray(arial).join('') !== getDotArray(fontFamily).join('')
}