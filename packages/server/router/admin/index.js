import { Router } from 'express';
import QRCode from 'qrcode'

import db from '../../database';

const router = Router();

// 새로운 장소 생성
router.post('/place', (req, res, _) => {
  return res.json({})
})

// 기존 장소 수정
router.put('/place/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  const { place } = req.body;

  db.get('places')
    .find({ id: Number(placeID) })
    .assign(place)
    .write()
  
  db.read()
  return res.json({})
})

// 기존 맵 수정
router.put('/map/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  const { map } = req.body;

  db.get('maps')
    .find({ placeID: Number(placeID) })
    .assign({ map })
    .write()
  
  db.read()
  return res.json({})
})

// 기존 영역 업데이트
router.put('/domains/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  const { domains } = req.body;

  // domains.forEach((domain, idx) =>)
  db.get('domains')
    .find({ placeID: Number(placeID) })
    .assign({ domains })
    .write()
  
  db.read()
  return res.json({})
})

// QR 코드 렌더링
router.get('/render/qrcode/:placeID/:coords', (req, res, _) => {
  const { placeID, coords } = req.params;

  // coord: 'x,y,z'
  const [ x, y, z ] = coords.split(',')
  const content = {
    id: Number(placeID),
    x, y, z,
  }
  QRCode.toDataURL(JSON.stringify(content))
    .then((qrcode) => {
      return res.json({
        qrcode
      })
    })
})

export default router;
