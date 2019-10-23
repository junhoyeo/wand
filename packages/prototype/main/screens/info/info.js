const roomID = gup['roomID']
let roomPoint = []

const roomElements = {
  wrap: document.getElementById('header-wrap'),
  cover: {
    title: document.querySelector('#header-wrap h1.title'),
    desc: document.querySelector('#header-wrap p.desc'),
  },
  name: document.querySelector('#header-main h1.name'),
  desc: document.querySelector('#header-main p.desc'),
}

function renderCards(cards) {
  const cardList = document.getElementById('card-list')
  cards.forEach((card) => {
    const cardItem = document.createElement('div')
    cardItem.className = 'card'
    cardItem.innerHTML = `
      <img src="${card.image}">
      <div class="card-info">
        <span class="name">
          ${card.name}
        </span>
        <span class="type">
          ${card.type}
        </span>
        <span class="price">
          ${card.price.toLocaleString()}원
        </span>
      </div>`
    cardList.appendChild(cardItem)
  })
}

;(async function initRoom() {
  const { data: { room, point } } = await axios.get(`http://localhost:9000/place/room/0/${roomID}`)
  roomElements.wrap.style.backgroundImage = `url('${room.cover.image}')`
  roomElements.cover.title.innerText = room.cover.title
  roomElements.cover.desc.innerText = room.cover.desc
  roomElements.name.innerText = room.name
  roomElements.desc.innerText = room.desc
  roomPoint = point
  renderCards(room.cards)
})();

function onClickPath() {
  if (!roomPoint.length) {
    alert('경로를 찾을 수 없습니다.')
    return
  }
  location.href = `${rootURL}/main?x=${gup['x']}&y=${gup['y']}&destX=${roomPoint[0]}&destY=${roomPoint[1]}`
}
