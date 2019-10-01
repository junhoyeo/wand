let isSearchOpen = false
function setSearchElementState(elementID) {
  const element = document.getElementById(elementID)
  element.style.visibility = isSearchOpen ? 'hidden' : 'unset'
}

function toggleSearchContainer() {
  setSearchElementState('search-container')
  setSearchElementState('overlay')
  isSearchOpen = !isSearchOpen
  if (isSearchOpen) {
    document.getElementById('search-input').focus()
  }
}

Object.keys(searchQueries).forEach(key => {
  const element = document.getElementById(`search-${key}`)
  searchQueries[key].forEach(query => {
    const tag = document.createElement('span')
    tag.className = 'search-tag'
    tag.innerText = query
    element.appendChild(tag)
  })
})
