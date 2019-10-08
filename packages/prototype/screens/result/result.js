const query = gup['query']
const searchInput = document.getElementById('search-input')

;(function setSearchText(text) {
  searchInput.value = text
})(query);
