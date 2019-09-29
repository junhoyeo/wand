const sketch = document.getElementById('sketch')
const output = document.getElementById('output')

for (let i = 0; i < 30; i++) {
  let row = document.createElement('div')

  for (let j = 0; j < 60; j++) {
    let cell = document.createElement('button')
    cell.id = i * 60 + j
    cell.className = 'cell'
    if (i === 0 || i === 29 || j === 0 || j == 59)
      cell.className += ' selected'
    cell.innerHTML = ' '
    row.appendChild(cell)
  }

  sketch.appendChild(row)
}

function exportMap() {
  const tiles = Array.prototype.slice.call(document.getElementsByClassName('cell'))
  let map = []
  let row = []
  tiles.forEach((tile, idx) => {
    const value = Number(tile.className.includes('selected'))
    row.push(value)
    if ((idx + 1) % 60 == 0) {
      map.push(row)
      row = []
    }
  })
  return map
}

function loadMap() {

  function setTileState(tile, state) {
    tile.className = `cell${ state ? ' selected' : '' }`
  }

  const map = JSON.parse(localStorage.getItem('map'))
  const tiles = Array.prototype.slice.call(document.getElementsByClassName('cell'))
  tiles.forEach((tile, idx) => {
    setTileState(tile, map[Math.floor(idx / 60)][idx % 60])
  })

  return map
}

function drawEventListener(event) {
  const element = event.target
  const classes = element.className.split(' ')
  const map = JSON.stringify(exportMap())
  if (classes.includes('cell')) {
    if (classes.includes('selected'))
      element.className = 'cell'
    else
      element.className += ' selected'
    output.innerHTML = map
  }
  if (element.id === 'save') {
    localStorage.setItem('map', map)
    window.alert('저장했습니다.')
  } else if (element.id === 'load') {
    loadMap()
    window.alert('이전에 저장한 지도를 불러왔습니다.')
  }
}

document.body.addEventListener('click', drawEventListener, false)
