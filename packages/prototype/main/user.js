// render pin by user location
const userLocation = [gup['x'] || 3, gup['y'] || 3]
const userPin = document.getElementById('user-location')
userPin.style.top = `${userLocation[0] * 15}px`
userPin.style.left = `${userLocation[1] * 15}px`

// rotate pin by cursor
const userPinRects = userPin.getBoundingClientRect()
const userPinX = userPinRects.left + userPinRects.width / 2
const userPinY = userPinRects.top + userPinRects.height / 2

document.addEventListener('mousemove', function(event) {
  userPin.style.transform = `rotate(${
    Math.atan2(event.clientY - userPinY, event.clientX - userPinX)}rad)`
})
