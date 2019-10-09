function moveToRoute(route) {
  setTimeout(() => {
    location.href = `${rootURL}/${route}`
  }, 100)
}

function onClickHome() {
  moveToRoute('../')
}

function onClickButton(route) {
  if (location.href.includes(`/${route}`))
    return
  moveToRoute(route)
}
