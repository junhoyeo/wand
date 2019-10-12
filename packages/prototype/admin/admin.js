const iframe = document.getElementsByTagName('iframe')[0]

function moveToRoute(route) {
  setTimeout(() => {
    iframe.src = `${rootURL}/${route}`
  }, 100)
}

function onClickHome() {
  location.href = rootURL
}

function onClickButton(route) {
  if (iframe.src.includes(`/${route}`))
    return
  moveToRoute(route)
}
