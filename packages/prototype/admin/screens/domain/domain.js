document.body.removeEventListener('click', drawEventListener)

let domains = []
let currentDomain = {
  startPoint: [3, 3],
  endPoint: [3, 3],
}
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
  // if (!tile.className.includes('selected'))
  tile.className += ' domain'
  tile.dataset.domain = domains.length
}

function initCurrentDomain() {
  currentDomain = {
    startPoint: [3, 3],
    endPoint: [3, 3],
  }
}

function normalizeCurrentDomain() {
  // 올바른 형태의 startPoint, endPoint로 변경
}

function registerCurrentDomain() {
  // 현재 영역 등록 및 초기화
  domains.push(currentDomain)
  initCurrentDomain()
}

function drawDomain() {
  normalizeCurrentDomain()
  const { startPoint, endPoint } = currentDomain
  for (let i = startPoint[1]; i <= endPoint[1]; i++) {
    for (let j = startPoint[0]; j <= endPoint[0]; j++) {
      setDomainState(j, i)
    }
  }
  registerCurrentDomain()
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
      currentDomain.startPoint = elementPoint
      element.className += ' start'
    } else {
      currentDomain.endPoint = elementPoint
      element.className += ' end'
      drawDomain()
    }
    isStartPoint = !isStartPoint
  }
}

document.body.addEventListener('click', clickEventListener)
