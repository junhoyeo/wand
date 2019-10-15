function setPathState(point) {
  const elementID = point[1] * 60 + point[0]
  const tile = document.getElementById(elementID)
  tile.className += ' path'
}
