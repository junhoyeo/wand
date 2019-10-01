let isSearchOpen = false
function setSearchElementState (elementID) {
  const element = document.getElementById(elementID)
  element.style.visibility = isSearchOpen ? 'hidden' : 'unset'
}

function toggleSearchContainer () {
  setSearchElementState('search-container')
  setSearchElementState('overlay')
  isSearchOpen = !isSearchOpen
}
