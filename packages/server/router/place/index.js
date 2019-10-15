import { Router } from 'express';
import db from '../../database';

const router = Router();

router.get('/info/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  return res.json({
    place: db.get('places').find({ id:Number(placeID) }).value()
  })
})

router.get('/map/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  return res.json({
    map: db.get('maps').find({ id:Number(placeID) }).value()
  })
})

router.get('/domains/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  return res.json({
    domains: db.get('domains').filter({ placeID: Number(placeID) }).value()
  })
})

router.get('/rec/:placeID', (req, res, _) => {
  const { placeID } = req.params;
  return res.json({
    title: '오늘 점심은 여기서 어때요?',
    cards: db.get('rooms').filter({ placeID: Number(placeID) }).value()
      .filter(room => room.id < 2)
      .map(room => Object.assign(room.card, {
        id: room.id
      }))
  })
})

router.get('/room/:placeID/:roomID', (req, res, _) => {
  const { roomID } = req.params;
  return res.json({
    room: db.get('rooms').find({ id: Number(roomID) }).value()
  })
})

export default router;
