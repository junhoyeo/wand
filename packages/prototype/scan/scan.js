const camera = document.getElementById('camera');

navigator.mediaDevices.getUserMedia({
  video: true
}).then(stream => {
  camera.srcObject = stream
})

function onClickNext() {
  location.href = `${rootURL}/main?x=5&y=3`
}
