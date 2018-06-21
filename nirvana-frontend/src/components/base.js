// rem
let html = document.querySelector("html")
let width = html.getBoundingClientRect().width
html.style.fontSize = width / 10 + "px"
// 禁用双指缩放
document.documentElement.addEventListener("touchstart", function (event) {
  if (event.touches.length > 1) {
    event.preventDefault()
  }
}, false)
// 禁用手指双击缩放
let lastTouchEnd = 0
document.documentElement.addEventListener("touchend", function (event) {
  let now = Date.now()
  if (now - lastTouchEnd <= 300) {
    event.preventDefault()
  }
  lastTouchEnd = now
}, false)
