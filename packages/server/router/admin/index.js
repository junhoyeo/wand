import { Router } from 'express';
import db from '../../database';

const router = Router();

// 새로운 장소 생성
router.post('/place', (req, res, _) => {
  return res.json({})
})

// 기존 장소 수정
router.put('/place/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  return res.json({})
})

// 기존 영역 업데이트
router.put('/domains/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  return res.json({})
})

// QR 코드 렌더링
router.get('/render/qrcode/:placeID/:coords', (req, res, _) => {
  // coord: 'x,y,z'
  const { placeID, coords } = req.params;
  const geodata = coords.split(',')
  return res.json({})
})

export default router;
