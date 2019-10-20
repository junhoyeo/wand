import db from './database'

const rawMap = '111111111111111111111111111111111111111111111111111111111111,100000000100000010000010000000000000000000000000001000000001,100000000100000010000010000000000000000000000000001000000001,100000000100000010000010000000000000000000000000001000000001,100000000100000010000010000011111111111111111111111000000001,100000000000000010000010000010000010000010000010001000000001,100000000000000011001110000010000010000010000010001111100111,100000000100000000000000000010000010000010000010000010000001,100000000100000000000000000010000010000010000010000010000001,100000000100000000000000000010000010000010000010000010000001,100000000100000000000000000010000010000010000010000010000001,100000000100000000000000000011001111001111001111001110000001,100000000100000000000000000000000000000000000000000000000001,100000000100000000000000000000000000000000000000000000000001,100000000100000000000000000000000000000000000000000000000001,100000000100000000000000000000000000000000000000000000000001,100000000100000000000000000000000000000000000000000000000001,100000000100000000000000000000000000000000000000000000000001,100000000000000000000000000000000000000000000000000000000001,100000000000000000000000000000000000000000000000000000000001,100000000100000000000000000000000000000000000000000000000001,100000000111111100110000001110111111111111111110011111111111,100000000100000000010000001000000000000000001000000000000001,100000000100000000010000001000000000000000001000000000000001,100000000100000000010000001000000000000000001000000000000001,100000000100000000010000001000000000000000001000000000000001,100000000100000000010000001000000000000000001000000000000001,100000000000000000010000001000000000000000001000000000000001,100000000000000000010000001000000000000000001000000000000001,111111111111111111111111111111111111111111111111111111111111'
const testMap = rawMap.split(',').map(line =>
  line.split('').map(cell => Number(cell)))

const testDomains = [
  { label: "대강당", start: [1, 1], end: [8, 28], roomID: 2 }, 
  { label: "휴게실", start: [10, 22], end: [18, 28], roomID: 3 },
  { label: "화장실", start: [17, 1], end: [21, 5] },
  { label: "121 진행실", start: [29, 5], end: [33, 10] },
  { label: "사무실", start: [35, 5], end: [39, 10] },
  { label: "회의실", start: [41, 5], end: [45, 10] },
  { label: "휴게실", start: [47, 7], end: [51, 10] },
  { label: "다목적룸", start: [51, 1], end: [58, 5] },
  { label: "오피스존", start: [45, 22], end: [58, 28] },
  { label: "사무실", start: [27, 22], end: [43, 28] }
]

const testRooms = [
  {
    id: 0,
    card: {
      name: '바베큐장',
      image: 'http://localhost:3000/images/bbq-card.png',
      hours: '18:00 ~ 20:00',
      location: '야외 공간',
    },
    cover: {
      image: 'http://localhost:3000/images/bbq-cover.jpg',
      title: '맛있게 즐기는 가을, 바베큐',
      desc: '낭만 가득히 즐기는 바베큐. 고객별 선호도를 분석하여 정성이 담긴 차별화된 메뉴의 식사를 제공합니다.'
    },
    name: '바베큐장',
    desc: '남녀노소, 모든 방문객들에게 인기 만점인 야외 바베큐장입니다.',
    cards: [
      {
        name: "바베큐 백립",
        type: "앙트레 플래터",
        price: 15000,
        image: "http://localhost:3000/images/bbq-back-rib.jpg"
      },
      {
        name: "델리미트 브런치",
        type: "브런치 플래터",
        price: 14800,
        image: "http://localhost:3000/images/deli-meats-brunch.jpg"
      },
      {
        name: "루빈 샌드위치",
        type: "샌드위치 플래터",
        price: 16000,
        image: "http://localhost:3000/images/reuben-sandwich.jpg"
      }
    ]
  },
  {
    id: 1,
    card: {
      name: '카페',
      image: 'http://localhost:3000/images/cafe-card.png',
      hours: '06:00 ~ 24:00',
      location: '야외 공간',
    },
    cover: {
      image: 'http://localhost:3000/images/cafe-cover.png',
      title: '차별화된 커피 경험을 누리다.',
      desc: '매년 가을 출시되며 더욱 나아지고 있는 애니버서리 블렌드는 진하고 독특한 풍미가 특징인 스타벅스만의 특별한 원두입니다.'
    },
    name: '카페',
    desc: '본관 숙소동 1층에 위치한 아름다운 분위기의 카페입니다.',
    cards: [
      {
        name: "화이트 타이거 프라푸치노",
        type: "프라푸치노",
        price: 6500,
        image: "http://localhost:3000/images/9200000002403.jpg"
      },
      {
        name: "콜드 폼 콜드 브루",
        type: "콜드 브루",
        price: 5800,
        image: "http://localhost:3000/images/9200000000949.jpg"
      },
      {
        name: "자바 칩 프라푸치노",
        type: "프라푸치노",
        price: 6100,
        image: "http://localhost:3000/images/168016.jpg"
      },
      {
        name: "샷 그린 티 라떼",
        type: "티바나",
        price: 5900,
        image: "http://localhost:3000/images/9200000000170.jpg"
      },
    ]
  },
  {
    id: 2,
    cover: {
      image: 'http://localhost:3000/images/hall-cover.jpg',
      title: '최대 1,200석의 강의장 시설',
      desc: '강의, 프리젠테이션, 그룹 토의 등에 필요한 각종 교육 기자재를 완비하여 최적의 교육 지원이 가능합니다.'
    },
    name: '대강당',
    desc: '각종 행사를 개최하고 있는 대웅경영개발원의 대강당입니다.',
    cards: []
  },
  {
    id: 3,
    cover: {
      image: 'http://localhost:3000/images/hall-cover.jpg',
      title: '최대 1,200석의 강의장 시설',
      desc: '강의, 프리젠테이션, 그룹 토의 등에 필요한 각종 교육 기자재를 완비하여 최적의 교육 지원이 가능합니다.'
    },
    name: '휴게실',
    desc: '각종 행사를 개최하고 있는 대웅경영개발원의 대강당입니다.',
    cards: []
  },
  {
    id: 4,
    cover: {
      image: 'http://localhost:3000/images/new.png',
      title: '내일도 출근하고 싶은 사무실',
      desc: '보기 좋고, 일하기 좋은 공간을 만들었습니다.',
    },
    name: '회의실 B',
    desc: '입주자 전용 회의실입니다.',
    cards: []
  }
]

db.defaults({
  places: [],
  maps: [],
  domains: [],
  rooms: [],
})
  .write()

db.get('places')
  .push({
    id: 0,
    type: '교육 센터',
    name: '대웅경영개발원',
    address: '경기도 용인시 처인구 포곡읍 두계로 72',
    notice: '컨벤션대강당 로비 타일 교체 작업 중 출입을 제한합니다.',
  })
  .write()

db.get('maps')
  .push({
    placeID: 0,
    map: testMap,
  })
  .write()

db.get('domains').push({
  placeID: 0,
  domains: testDomains,
})
  .write()

testRooms.forEach(room => {
  db.get('rooms').push(
    Object.assign(room, {
      placeID: 0,
    })
  )
    .write()
})

console.log(db.getState())
