const video = document.getElementById('camera')
const scanner = new Instascan.Scanner({ video })

const isValidData = (data) => {
  return ['id', 'x', 'y'].some((key) => data.hasOwnProperty(key))
}

scanner.addListener('scan', function (content) {
  try {
    const data = JSON.parse(content)
    if (!isValidData(data)) return
    location.href = `${rootURL}/main?x=${data.x}&y=${data.y}`
  } catch (_) {
    return
  }
})

Instascan.Camera.getCameras().then(function (cameras) {
  if (cameras.length > 0) {
    scanner.start(cameras[0])
  } else {
    scanner.stop()
    console.error('No cameras found.')
  }
}).catch(function (e) {
  scanner.stop()
  console.error(e)
})

function onClickNext() {
  location.href = `${rootURL}/main?x=5&y=3`
}
