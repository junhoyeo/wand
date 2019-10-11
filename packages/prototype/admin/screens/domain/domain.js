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
  if (!tile.className.includes('selected')) {
    tile.className += ' domain'
    tile.dataset.domain = domains.length
  }
}

function initCurrentDomain() {
  currentDomain = {
    startPoint: [3, 3],
    endPoint: [3, 3],
  }
}

function normalizeCurrentDomain() {
  // 올바른 형태의 startPoint, endPoint로 변경
  currentDomain.id = domains.length
}

function registerCurrentDomain() {
  // 현재 영역 등록 및 초기화
  domains.push(currentDomain)
  initCurrentDomain()
}

function drawLabel(domain) {
  const { id, startPoint, endPoint } = domain
  const centerX = startPoint[0] + Math.round((endPoint[0] - startPoint[0]) / 2)
  const centerY = startPoint[1] + Math.round((endPoint[1] - startPoint[1]) / 2)
  
  const label = document.createElement('div')
  label.id = `domain-label-${id}`
  label.className = 'label'
  label.innerHTML = `
    <button class="delete" onclick="onClickDeleteDomain(${id})">
      <img src="../../../assets/icons/times-solid.svg">
    </button>
    <span class="name">
      <div>
        <span>라벨</span>
        <img src="../../../assets/icons/pencil-alt-gray.svg">
      </div>
    </span>`
  label.style.left = `calc(${centerX * 20}px - 1.5rem)`
  label.style.top = `calc(${centerY * 20}px - 0.5rem)`
  const sketchWrap = document.getElementById('sketch-wrap')
  sketchWrap.insertBefore(label, sketch)    
}

function drawDomain() {
  normalizeCurrentDomain()
  const { startPoint, endPoint } = currentDomain
  for (let i = startPoint[1]; i <= endPoint[1]; i++) {
    for (let j = startPoint[0]; j <= endPoint[0]; j++) {
      setDomainState(j, i)
    }
  }
  drawLabel(currentDomain)
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

function onClickDeleteDomain(domainID) {
  domains.splice(domainID, 1)
  const label = document.getElementById(`domain-label-${domainID}`)
  label.parentNode.removeChild(label)
  const tiles = Array.prototype.slice.call(document.querySelectorAll(`[data-domain~="${domainID}"]`))
  tiles.forEach((tile) => {
    ;['start', 'end', 'domain'].forEach((key) => {
      tile.classList.remove(key)
    })
    tile.removeAttribute('data-domain')
  })
}

function renderDomains() {
  domains.forEach((domain) => {
    currentDomain = domain
    drawDomain()
  })
}
