const svg = document.getElementById('svg')
svg.viewBox.baseVal.x = 0
svg.viewBox.baseVal.y = -100
svg.viewBox.baseVal.width = 1300
svg.viewBox.baseVal.height = 600
const map = document.getElementById('map')
const places = Array.prototype.slice.call(map.getElementsByTagName('g'))

function getCenterPoint(element) {
  const bbox = element.getBBox()
  const ctm = element.getCTM()
  const pt = svg.createSVGPoint()
  pt.x = bbox.x + bbox.width / 2
  pt.y = bbox.y + bbox.height / 2
  return pt.matrixTransform(ctm)
}

function drawLabel(element) {
  // let rect = element.getElementsByTagName('rect')[0]
  let shape = document.createElementNS(element, 'text')
  shape.setAttributeNS(null, 'x', '3')
  shape.setAttributeNS(null, 'y', '5')
  shape.textContent = element.id
  element.appendChild(shape)
}

const mapData = places.map((element) => {
  const center = getCenterPoint(element)
  console.log(center)
  drawLabel(element)
  return {
    center,
    element,
  }
})

document.getElementById('svg-wrap').innerHTML += ''
