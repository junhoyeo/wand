const sketch = document.getElementById('sketch')

for (let i = 0; i < 30; i++) {
  const row = document.createElement('div')

  for (let j = 0; j < 60; j++) {
    const cell = document.createElement('button')
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

(loadMap = async function () {

  function setTileState(tile, state) {
    tile.className = `cell${ state ? ' selected' : '' }`
  }

  const { data: { map: { map } } } = await axios.get('http://wandapi.inudevs.com/place/map/0')
  const tiles = Array.prototype.slice.call(document.getElementsByClassName('cell'))
  tiles.forEach((tile, idx) => {
    setTileState(tile, map[Math.floor(idx / 60)][idx % 60])
  })

  return map
})();

let lastDrag = false

async function drawEventListener(event) {
  const element = event.target
  const classes = element.className.split(' ')
  const map = JSON.stringify(exportMap())
  if (lastDrag) {
    lastDrag = false
    return
  }
  if (classes.includes('cell')) {
    if (classes.includes('selected'))
      element.className = 'cell'
    else
      element.className += ' selected'
    latestElement = element
  }
  if (element.id === 'save') {
    const { status } = await axios.put('http://wandapi.inudevs.com/admin/map/0', {
      map: JSON.parse(map),
    })
    if (status === 200)
      window.alert('저장했습니다.')
  } else if (element.id === 'discard') {
    await loadMap()
  }
}

document.body.addEventListener('click', drawEventListener, false)
