const roomID = gup['roomID']

const roomElements = {
  wrap: document.getElementById('header-wrap'),
  cover: {
    title: document.querySelector('#header-wrap h1.title'),
    desc: document.querySelector('#header-wrap p.desc'),
  },
  name: document.querySelector('#header-main h1.name'),
  desc: document.querySelector('#header-main p.desc'),
}

;(async function initRoom() {
  const { data: { room } } = await axios.get(`http://localhost:3000/place/room/0/${roomID}`)
  roomElements.wrap.style.backgroundImage = `url('${room.cover.image}')`
  roomElements.cover.title.innerText = room.cover.title
  roomElements.cover.desc.innerText = room.cover.desc
  roomElements.name.innerText = room.name
  roomElements.desc.innerText = room.desc
})();
