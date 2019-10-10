const map = loadMap()

const header = {
  title: document.getElementById('header-title'),
  desc: document.getElementById('header-desc'),
}

const cards = {
  title: document.getElementById('cards-title'),
  list: document.getElementById('cards-list')
}

function onClickPlaceCard(place) {
  location.href = `${rootURL}/main/screens/info?card=${place.name}`
}

function renderPlaceCard(place) {
  const card = document.createElement('div')
  card.className = 'item'
  card.onclick = onClickPlaceCard
  card.innerHTML = `
    <img src="${place.image}">
    <div class="info">
      <h2 class="title">${place.name} <figure class="circle"></figure></h2>
      <span class="meta">
        <span class="hours">영업 ${place.hours}</span>
        <span class="location">${place.location}</span>
      </span>
    </div>`
  cards.list.appendChild(card)
}

(function initHeader() {
  header.title.innerText = '대웅경제개발원 1F'
  header.desc.innerText = '컨벤션대강당 로비 타일 교체 작업 중 출입을 제한합니다.'
})();

(function initCards() {
  cards.title.innerText = '오늘 점심은 여기서 어때요?'
  renderPlaceCard(places[0])
  renderPlaceCard(places[1])
})();

initSearchQueries()

document.body.removeEventListener('click', drawEventListener)
