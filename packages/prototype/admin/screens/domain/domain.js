document.body.removeEventListener('click', drawEventListener)

let domains = []
let currentDomain = {
  startPoint: [3, 3],
  endPoint: [3, 3],
}
let isStartPoint = true

function normalizeCurrentDomain() {
  // 올바른 형태의 startPoint, endPoint로 변경
}

function setDomainState(x, y, idx) {
  const elementID = y * 60 + x
  const tile = document.getElementById(elementID)
  if (['selected', 'domain'].some((key) => !tile.className.includes(key))) {
    tile.className += ' domain'
    tile.dataset.domain = idx
  }
}

function initCurrentDomain() {
  currentDomain = {
    startPoint: [3, 3],
    endPoint: [3, 3],
  }
}

function drawLabel(domain, idx) {
  const { startPoint, endPoint } = domain
  const centerX = startPoint[0] + Math.round((endPoint[0] - startPoint[0]) / 2)
  const centerY = startPoint[1] + Math.round((endPoint[1] - startPoint[1]) / 2)
  
  const label = document.createElement('div')
  label.id = `domain-label-${idx}`
  label.className = 'label'
  label.innerHTML = `
    <button
      class="delete"
      onclick="onClickDeleteDomain(${idx})"
    >
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

function registerCurrentDomain() {
  // 현재 영역 등록 및 초기화
  domains.push(currentDomain)
  initCurrentDomain()
}

function drawDomain(idx) {
  normalizeCurrentDomain()
  const { startPoint, endPoint } = currentDomain
  for (let i = startPoint[1]; i <= endPoint[1]; i++) {
    for (let j = startPoint[0]; j <= endPoint[0]; j++) {
      setDomainState(j, i, idx)
    }
  }
  drawLabel(currentDomain, idx)
  registerCurrentDomain()
}

function clickEventListener(event) {
  const element = event.target
  const classes = element.className.split(' ')
  if (element.id === 'discard') {
    loadDomains()
    return
  }
  else if (lastDrag) {
    lastDrag = false
    return
  }
  if (classes.includes('cell') && 
    ['selected', 'start', 'end'].some((key) => !classes.includes(key))) {
    const elementID = Number(element.id)
    const elementPoint = [elementID % 60, Math.floor(elementID / 60)]

    if (isStartPoint) {
      currentDomain.startPoint = elementPoint
      element.className += ' start'
    } else {
      currentDomain.endPoint = elementPoint
      element.className += ' end'
      drawDomain(domains.length)
    }
    isStartPoint = !isStartPoint
  }
}

document.body.addEventListener('click', clickEventListener)

function onClickDeleteDomain(domainID, splice = true) {
  if (splice)
    domains.splice(domainID, 1)
  const label = document.getElementById(`domain-label-${domainID}`)
  console.log(`domain-label-${domainID}`)
  try {
    label.parentNode.removeChild(label)
  } catch (_) {}
  const tiles = Array.prototype.slice.call(document.querySelectorAll(`[data-domain~="${domainID}"]`))
  tiles.forEach((tile) => {
    ;['start', 'end', 'domain'].forEach((key) => {
      tile.classList.remove(key)
    })
    tile.removeAttribute('data-domain')
  })
}

function renderDomains(temp) {
  temp.forEach((domain, idx) => {
    currentDomain = domain
    drawDomain(idx)
  })
}

function loadDomains() {
  domains.forEach((_, idx) => {
    onClickDeleteDomain(idx, false)
  })
  
  let temp = []
  try {
    temp = JSON.parse(localStorage.getItem('domains')) || []
  } catch (_) {
    temp = []
  }
  renderDomains(temp)
}

loadDomains()

function saveDomains() {
  localStorage.setItem('domains', JSON.stringify(domains))
  window.alert('저장했습니다.')
}
