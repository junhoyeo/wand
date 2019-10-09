const query = gup['query']
const searchInput = document.getElementById('search-input')

;(function setSearchText(text) {
  searchInput.value = text
})(query);

function renderResultCard(result, cardListID) {
  const card = document.createElement('div')
  const cardList = document.getElementById(cardListID)
  card.className = 'card'
  card.innerHTML = `
    <img src="${result.image}">
    <div class="info">
      <h1 class="title">${result.title}</h1>
      <p class="desc">${result.desc}</p>
    </div>
    <a
      class="more"
      href="${result.link}"
      target="_blank"
    >
      더 알아보기
    </a>`
  cardList.insertBefore(card, document.getElementById('card-end'))
}

;(function initCards() {
  setTimeout(() => {
    searchResults.forEach(card => {
      renderResultCard(card, 'event-cards')
    })
  }, 500)
})();
