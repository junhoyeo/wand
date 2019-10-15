const map = (async function() {
  await loadMap();
})();

const header = {
  title: document.getElementById('header-title'),
  desc: document.getElementById('header-desc'),
}

const cards = {
  title: document.getElementById('cards-title'),
  list: document.getElementById('cards-list')
}

function renderPlaceCard(place) {
  const card = document.createElement('a')
  card.className = 'item'
  card.href = `${rootURL}/main/screens/info?roomID=${place.id}`
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

(async function initCards() {
  const { data: { title, cards: places } } = await axios.get('http://localhost:3000/place/rec/0')
  cards.title.innerText = title
  renderPlaceCard(places[0])
  renderPlaceCard(places[1])
})();

initSearchQueries()

document.body.removeEventListener('click', drawEventListener)

// 검색인지 확인

const destination = [
  gup['destX'],
  gup['destY'],
]

;(async function() {
  if (destination[0]) {
    // 검색
    // userLocation => destination
    const { data: { route: { path } } } = await axios.get(`http://localhost:3000/place/route/0/${userLocation.join(',')}/${destination.join(',')}`)
    path.forEach((point, idx) => {
      if ([0, path.length - 1].includes(idx)) return
      setPathState(point)
    })
  }
})()
