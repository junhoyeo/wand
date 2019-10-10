const query = gup['query']
const searchInput = document.getElementById('search-input')

;(function setSearchText(text) {
  searchInput.value = text
})(query);

function renderSkeletonCard(cardListID) {
  const skeleton = document.createElement('div')
  const cardList = document.getElementById(cardListID)
  skeleton.className = 'skeleton-card'
  skeleton.innerHTML = `
    <div class="skeleton-image"></div>
    <div class="skeleton-info">
      <div class="skeleton-title"></div>
      <div class="skeleton-desc">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
    <div
      class="skeleton-more"
      target="_blank"
    ></div>`
  cardList.insertBefore(skeleton, document.getElementById('card-end'))  
}

function hideSkeletonCards() {
  const skeletons = Array.prototype.slice.call(document.getElementsByClassName('skeleton-card'))
  skeletons.forEach((element) => {
    element.parentNode.removeChild(element)
  })
}

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

;(function initSkeleton() {
  renderSkeletonCard('event-cards')
  renderSkeletonCard('event-cards')
})();

;(function initCards() {
  setTimeout(() => {
    hideSkeletonCards()
    searchResults.forEach(card => {
      renderResultCard(card, 'event-cards')
    })
  }, 800)
})();
