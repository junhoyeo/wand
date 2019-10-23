document.body.removeEventListener('click', drawEventListener)

const qrcodeImage = document.getElementById('qrcode')
const QRcontainer = document.getElementById('qrcode-container')
let isQRcontainerInit = false

function initCells() {
  const tiles = Array.prototype.slice.call(document.querySelectorAll('.cell:not(.selected)'))
  tiles.forEach(cell => {
    cell.className = 'cell'
  })
}

async function getQRcode(x, y, z=1) {
  const { data: { qrcode } } = 
    await axios.get(`http://localhost:9000/admin/render/qrcode/0/${x},${y},${z}`)
  return qrcode
}

function moveQRcontainer(cellX, cellY) {
  QRcontainer.style.left = `calc(${cellX * 20}px - 6rem)`
  QRcontainer.style.top = `calc(${cellY * 20}px - 1rem)`
}

async function clickEventListener(event) {
  const element = event.target
  const classes = element.className.split(' ')
  if (lastDrag) {
    lastDrag = false
    return
  }
  if (classes.includes('cell') && !classes.includes('selected')) {
    if (classes.includes('qrcode'))
      element.className = 'cell'
    else {
      initCells()
      cellX = element.id % 60
      cellY = Math.floor(element.id / 60)

      const qrcode = await getQRcode(cellX, cellY)
      qrcodeImage.src = qrcode

      if (!isQRcontainerInit) {
        isQRcontainerInit = true
        QRcontainer.style.display = 'flex'
      }
      moveQRcontainer(cellX, cellY)
      element.className += ' qrcode'
    }
    latestElement = element
  }
}

document.body.addEventListener('click', clickEventListener)

function onClickDiscard() {
  moveQRcontainer(0, 0)
  initCells()
  setTimeout(() => {
    isQRcontainerInit = false
    QRcontainer.style.display = 'none'
  }, 300)
}

function onClickDownload() {
  if (!isQRcontainerInit) {
    window.alert('생성된 QR 코드가 없습니다.')
    return
  }

  const anchor = document.createElement('a')
  anchor.style.display = 'none'
  anchor.href = qrcodeImage.src
  anchor.download = 'qrcode.png'
  document.body.appendChild(anchor)
  anchor.click()

  setTimeout(() => {
    document.body.removeChild(anchor)
  }, 100)
}
