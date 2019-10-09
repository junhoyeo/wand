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

function onClickSearchCard(event) {
  // ignore closing
  event.stopPropagation()
}

function onClickSearchTag(event) {
  event.stopPropagation()
  const query = event.target.innerText

  setTimeout(() => {
    location.href = `${rootURL}/screens/result?query=${query}`
  }, 250)
}

function initSearchQueries() {
  Object.keys(searchQueries).forEach(key => {
    const element = document.getElementById(`search-${key}`)
    searchQueries[key].forEach(query => {
      const tag = document.createElement('span')
      tag.className = 'search-tag'
      tag.innerText = query
      tag.onclick = onClickSearchTag
      element.appendChild(tag)
    })
  })
}

function onKeydownSearch(event) {
  if (event.keyCode !== 13) return

  // if enter pressed
  const query = event.target.value
  if (!query) return
  location.href = `${rootURL}/screens/result?query=${query}`
}
