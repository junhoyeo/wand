const map = loadMap()

document.body.removeEventListener('click', drawEventListener)

let grid = new PF.Grid(map)
const finder = new PF.AStarFinder()

let startPoint = (3, 3)
let endPoint = (25, 25)

function initPoints() {
}

function resetPoints() {
  ;['start', 'end', 'path'].forEach(className => {
    const points = Array.prototype.slice.call(document.getElementsByClassName(className))
    points.forEach(point => point.className = 'cell')
  })
}

function getRoute() {
  const gridBackup = grid.clone()
  const path = finder.findPath(startPoint[0], startPoint[1], endPoint[0], endPoint[1], grid);
  grid = gridBackup
  return path
}

function setPathState(point) {
  const elementID = point[1] * 60 + point[0]
  const tile = document.getElementById(elementID)
  tile.className += ' path'
}

let isStartPoint = true
document.body.addEventListener('click', function (event) {
  const element = event.target
  if (element.className.includes('cell')) {
    const isValid = ['selected', 'start', 'end'].every(className => !element.className.includes(className))
    if (!isValid)
      return

    const elementID = Number(element.id)
    const elementPoint = [elementID % 60, Math.floor(elementID / 60)]
    if (isStartPoint) {
      resetPoints()
      startPoint = elementPoint
      element.className += ' start'
    } else {
      endPoint = elementPoint
      element.className += ' end'
    }
    isStartPoint = !isStartPoint
  } else if (element.id === 'search-route') {
    const path = getRoute()
    path.forEach((point, idx) => {
      if ([0, path.length - 1].includes(idx)) return
      setPathState(point)
    })
  }
})
