export default {
  bind(el, { value }) {
    el.$value = value
    el.handler = () => {
      if (!el.$value) {
        alert('复制的内容为空')
        return
      }

      const textarea = document.createElement('textarea')
      textarea.readOnly = 'readonly'
      textarea.style.position = 'absolute'
      textarea.style.left = '-9999px'
      textarea.value = el.$value

      document.body.appendChild(textarea)
      textarea.select()
      const result = document.execCommand('Copy')
      if (result) {
        console.log(`复制成功, 内容为${el.$value}`)
      } else {
        alert('当前浏览器不支持复制')
      }

      document.body.removeChild(textarea)
    }

    el.addEventListener('click', el.handler)
  },
  componentUpdated(el, { value }) {
    el.$value = value
  },
  unbind(el) {
    el.removeEventListener('click', el.handler)
  }
}