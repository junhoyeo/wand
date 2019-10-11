document.body.removeEventListener('click', drawEventListener)

let startPoint = (3, 3)
let endPoint = (3, 3)
let isStartPoint = true

function resetPoints() {
  ;['start', 'end', 'path'].forEach(className => {
    const points = Array.prototype.slice.call(document.getElementsByClassName(className))
    points.forEach(point => point.className = 'cell')
  })
}

function setDomainState(x, y) {
  const elementID = y * 60 + x
  const tile = document.getElementById(elementID)
  if (!tile.className.includes('selected'))
    tile.className += ' domain'
}

function drawDomain() {
  console.log(startPoint, endPoint)
  for (let i = startPoint[1]; i <= endPoint[1]; i++) {
    for (let j = startPoint[0]; j <= endPoint[0]; j++) {
      setDomainState(j, i)
    }
  }
}

function clickEventListener(event) {
  const element = event.target
  const classes = element.className.split(' ')
  if (lastDrag) {
    lastDrag = false
    return
  }
  if (classes.includes('cell') && !classes.includes('selected')) {
    const elementID = Number(element.id)
    const elementPoint = [elementID % 60, Math.floor(elementID / 60)]

    if (isStartPoint) {
      // resetPoints()
      startPoint = elementPoint
      element.className += ' start domain'
    } else {
      endPoint = elementPoint
      element.className += ' end domain'
      drawDomain()
    }
    isStartPoint = !isStartPoint
  }
}

document.body.addEventListener('click', clickEventListener)
