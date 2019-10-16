document.body.removeEventListener('click', drawEventListener)

let domains = []
let currentDomain = {
  label: '라벨',
  start: [3, 3],
  end: [3, 3],
}
let isStart = true

function normalizeCurrentDomain() {
  // 올바른 형태의 start, end로 변경
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
    label: '라벨',
    start: [3, 3],
    end: [3, 3],
  }
}

function drawLabel(domain, idx, size=20) {
  const {
    start,
    end,
    label: labelText
  } = domain
  const centerX = start[0] + Math.round((end[0] - start[0]) / 2)
  const centerY = start[1] + Math.round((end[1] - start[1]) / 2)

  const label = document.createElement('div')
  const labelInner = (function () {
    if (!location.href.includes('admin')) {
      const labelHref = `${rootURL}/main/screens/info?roomID=${domain.roomID}&x=${userLocation[0]}&y=${userLocation[1]}`
      return `
        <a id="${`domain-name-${idx}`}" href="${labelHref}">
          ${labelText}
        </a>`
    } else return labelText
  })()
  label.id = `domain-label-${idx}`
  label.className = 'label'
  label.onmouseover = () => onMouseoverLabel(idx)
  label.innerHTML = `
    <button
      class="delete"
      onclick="onClickDeleteDomain(${idx})"
    >
      <img class="cancel" src="../../../assets/icons/times-solid.svg">
    </button>
    <div class="name">
      <span>
        ${labelInner}
      </span>
      <img
        id="${`domain-icon-${idx}`}"
        src="../../../assets/icons/pencil-alt-gray.svg"
        onclick="onClickEditLabel(event, ${idx})"
      >
    </div>`
  label.style.left = `calc(${centerX * size}px - 1.5rem)`
  label.style.top = `calc(${centerY * size}px - 0.5rem)`
  const sketchOverlay = document.getElementById('sketch-overlay')
  sketchOverlay.appendChild(label)
}

function registerCurrentDomain() {
  // 현재 영역 등록 및 초기화
  domains.push(currentDomain)
  initCurrentDomain()
}

function drawDomain(idx, size) {
  normalizeCurrentDomain()
  const { start, end } = currentDomain
  if (['start', 'end'].some((key) => 
    domains.find((v) => JSON.stringify(v[key]) === JSON.stringify(currentDomain[key])))
  ) {
    console.log(true)
    return
  }
  for (let i = start[1]; i <= end[1]; i++) {
    for (let j = start[0]; j <= end[0]; j++) {
      setDomainState(j, i, idx)
    }
  }
  drawLabel(currentDomain, idx, size)
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

    if (isStart) {
      currentDomain.start = elementPoint
      element.className += ' start'
    } else {
      currentDomain.end = elementPoint
      element.className += ' end'
      drawDomain(domains.length)
    }
    isStart = !isStart
  }
}

document.body.addEventListener('click', clickEventListener)

function onClickDeleteDomain(domainID, splice = true) {
  if (splice)
    domains.splice(domainID, 1)
  const label = document.getElementById(`domain-label-${domainID}`)
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

function onClickEditLabel(event, domainID) {
  const element = event.target
  const label = document.querySelector(`#domain-label-${domainID} div.name`)
  const labelName = document.getElementById(`domain-name-${domainID}`)

  if (element.src.includes('pencil')) {
    // 편집 버튼
    const labelInputBox = document.createElement('div')
    labelInputBox.id = `domain-input-${domainID}`
    labelInputBox.className = 'input'
    labelInputBox.innerHTML = `
      <input onkeydown="onKeydownLabelInput(event, ${domainID})"></input>
    `

    labelName.style.display = 'none';
    label.insertBefore(labelInputBox, labelName)

    // input
    const labelInput = labelInputBox.querySelector('input')
    labelInput.value = labelName.innerText.trim()
    labelInput.focus()

    element.src = "../../../assets/icons/check-solid.svg"
  } else {
    // 편집 내용 저장 버튼
    const labelInput = document.querySelector(`#domain-input-${domainID} input`)
    newLabelText = labelInput.value
    if (!newLabelText) return

    // 다시 라벨 보여주기
    labelName.innerText = newLabelText
    labelName.style.display = 'flex'; 
    element.src = "../../../assets/icons/pencil-alt-gray.svg"

    // 편집 input 박스 삭제
    labelInput.parentElement.parentNode.removeChild(labelInput.parentElement)

    // domains에 반영, localStorage에 저장
    domains[domainID].label = newLabelText
    saveDomains()
  }
}

function onKeydownLabelInput(event, domainID) {
  if (event.keyCode !== 13) return
  const fakeEvent = {
    target: document.getElementById(`domain-icon-${domainID}`)
  }
  console.log(fakeEvent)
  onClickEditLabel(fakeEvent, domainID)
}

function onMouseoverLabel(domainID) {
  const element = document.getElementById(`domain-label-${domainID}`)
  const labels = Array.prototype.slice.call(document.querySelectorAll('div.label.hovered'))
  labels.forEach((label) => label.className = 'label')
  element.className += ' hovered'
}

function renderDomains(temp, size=20) {
  temp.forEach((domain, idx) => {
    currentDomain = domain
    drawDomain(idx, size)
  })
}

async function loadDomains(size=20) {
  domains.forEach((_, idx) => {
    onClickDeleteDomain(idx, false)
  })

  domains = []
  const { data: { domains: temp } } = await axios.get('http://localhost:3000/place/domains/0')
  renderDomains(temp, size)
}

function saveDomains() {
  localStorage.setItem('domains', JSON.stringify(domains))
}
