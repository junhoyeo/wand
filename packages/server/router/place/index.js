import { Router } from 'express';
import PF from 'pathfinding';
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
  const roomDomain = db.get('domains').find({ roomID: Number(roomID) }).value()
  const roomCenter = (roomDomain) ? [
    roomDomain.start[0] + Math.round((roomDomain.end[0] - roomDomain.start[0]) / 2),
    roomDomain.start[1] + Math.round((roomDomain.end[1] - roomDomain.start[1]) / 2)
  ] : []
  return res.json({
    room: db.get('rooms').find({ id: Number(roomID) }).value(),
    point: roomCenter,
  })
})

router.get('/route/:placeID/:user/:dest', (req, res, _) => {
  const { placeID, user, dest } = req.params;
  const userLocation = user.split(',').map((v) => Number(v))
  const destination = dest.split(',').map((v) => Number(v))

  const map = db.get('maps').find({ id:Number(placeID) }).value().map
  const grid = new PF.Grid(map)
  const finder = new PF.AStarFinder()
  const path = finder.findPath(
    userLocation[1],
    userLocation[0],
    destination[0],
    destination[1],
    grid
  )
  return res.json({
    route: {
      path
    }
  })
})

export default router;
