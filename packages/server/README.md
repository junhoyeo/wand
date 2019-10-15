# Wand Server

## Place API

### Get place info with Place ID
GET `/place/info/{placeID}`

> Place ID를 이용해 장소 정보를 구합니다.

```json
{
  "place": {
    "id": 0,
    "type": "교육 센터",
    "name": "대웅경영개발원",
    "address": "경기도 용인시 처인구 포곡읍 두계로 72",
    "notice": "컨벤션대강당 로비 타일 교체 작업 중 출입을 제한합니다."
  }
}
```

### Get place map with Place ID
GET `/place/map/{placeID}`

> Place ID를 이용해 장소 지도를 구합니다.

```json
{
  "map": {
    "id": 0,
    "map": [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 1, 1]
    ]
  }
}
```

### Get place domains with Place ID
GET `/place/domains/{placeID}`

> Place ID를 이용해 장소 영역을 구합니다.

```json
{
  "domains": [
    {
      "id": 0,
      "placeID": 0,
      "data": { "label": "대강당", "start": [1, 1], "end": [8, 28] }
    },
    {
      "id": 1,
      "placeID": 0,
      "data": { "label": "휴게실", "start": [10, 22], "end": [18, 28] }
    },
    {
      "id": 2,
      "placeID": 0,
      "data": { "label": "화장실", "start": [17, 1], "end": [21, 5] }
    }
  ]
}
```

### Get recommendations cards with Place ID
GET `/place/rec/{placeID}`

> Place ID를 이용해 해당 장소의 추천 카드를 가져옵니다.

```json
{
  "title": "오늘 점심은 여기서 어때요?",
  "cards": [
    {
      "id": 0,
      "name": "바베큐장",
      "hours": "18:00 ~ 20:00",
      "location": "야외 공간",
      "image": "../assets/places/barbecue.jpg"
    },
    {
      "id": 1,
      "name": "카페",
      "hours": "06:00 ~ 24:00",
      "location": "숙소동 2층",
      "image": "../assets/places/cafe.jpg"
    },
  ]
}
```

### Get room info with Place ID and Room ID
GET `/place/room/{placeID}/{roomID}`

### Get route with Place ID and location information
GET `/place/route/{placeID}/{startX},{startY}/{endX},{endY}`

```json
{
  "start": [1, 1],
  "end": [2, 5]
}
```

> Place ID와 시작 위치, 도착 위치 정보를 받아 경로와 예상 이동 시간을 구합니다.
 
```json
{
  "route": {
    "minutes": 3,
    "path": [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 5]
    ]
  }
}
```

## Search API

### Search with Place ID and query
Place ID 장소 안의 쿼리 검색 결과를 반환합니다.

## Admin API

### Create new place
새로운 장소를 생성합니다.

### Update place
기존 장소를 업데이트합니다.

### Delete place
기존 장소를 삭제합니다.

### Create new domain
새로운 영역을 생성합니다.

### Update domain
기존 영역 목록을 업데이트합니다.

### Render QR code with Place ID and location
Place ID와 지도 좌표로 해당 위치의 QR 코드를 생성합니다.

<!-- ### Render map as html for iframe
렌더링된 맵을 제공합니다. -->
