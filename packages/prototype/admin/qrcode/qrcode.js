document.body.removeEventListener('click', drawEventListener)

const qrcode = new QRCode('qrcode')
const QRcontainer = document.getElementById('qrcode-container')
let isQRcontainerInit = false

function initCells() {
  const tiles = Array.prototype.slice.call(document.querySelectorAll('.cell:not(.selected)'))
  tiles.forEach(cell => {
    cell.className = 'cell'
  })
}

function generateQRcode(x, y) {
  const content = {
    id: '507f1f77bcf86cd799439011', // example id
    x, y,
  }
  qrcode.makeCode(JSON.stringify(content))
}

function moveQRcontainer(cellX, cellY) {
  QRcontainer.style.left = `calc(${cellX * 20}px - 6rem)`
  QRcontainer.style.top = `calc(${cellY * 20}px - 1rem)`
}

function clickEventListener(event) {
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
      generateQRcode(cellX, cellY)
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
