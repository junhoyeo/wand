const sketch = document.getElementById('sketch')
for (let i = 0; i < 30; i++) {
  let row = document.createElement('div')

  for (let j = 0; j < 60; j++) {
    let cell = document.createElement('button')
    cell.id = i * 30 + j
    cell.className = 'cell'
    if (i === 0 || i === 29 || j === 0 || j == 59)
      cell.className += ' selected'
    cell.innerHTML = ' '
    row.appendChild(cell)
  }

  sketch.appendChild(row)
}

function exportMap() {}

document.body.addEventListener('click', function (event) {
  const element = event.target
  const classes = element.className.split(' ')
  if (classes.includes('cell')) {
    if (classes.includes('selected'))
      element.className = 'cell'
    else
      element.className += ' selected'
  }
  if (classes.includes('save')) {
    console.log(exportMap())
  }
}, false)
