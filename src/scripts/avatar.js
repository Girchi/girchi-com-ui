const avatarImage = $('#avatar-image')
const avatarTrigger = $('#avatar-trigger')
const avatarInput = $('#avatar-input')

const createObjectURL = (i) => {
  var URL = window.URL || window.webkitURL || window.mozURL || window.msURL
  return URL.createObjectURL(i)
}

const resizeCrop = (src, width, height) => {
  var crop = width === 0 || height === 0
  // not resize
  if (src.width <= width && height === 0) {
    width = src.width
    height = src.height
  }
  // resize
  if (src.width > width && height === 0) {
    height = src.height * (width / src.width)
  }

  // check scale
  var xScale = width / src.width
  var yScale = height / src.height
  var scale = crop ? Math.min(xScale, yScale) : Math.max(xScale, yScale)
  // create empty canvas
  var canvas = document.createElement('canvas')
  canvas.width = width || Math.round(src.width * scale)
  canvas.height = height || Math.round(src.height * scale)
  canvas.getContext('2d').scale(scale, scale)
  // crop it top center
  canvas.getContext('2d').drawImage(src, ((src.width * scale) - canvas.width) * -0.5, ((src.height * scale) - canvas.height) * -0.5)
  return canvas.toDataURL('image/png', 90)
}

if (avatarTrigger.length) {
  avatarTrigger.on('click', () => {
    avatarInput.click()
  })

  avatarInput.on('change', e => {
    const image = new Image()
    image.src = createObjectURL(e.target.files[0])
    image.onload = function (e) {
      var base64 = resizeCrop(e.target, 240, 240)
      avatarImage.attr('src', base64)
    }
  })
}
