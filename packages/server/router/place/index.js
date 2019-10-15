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
    domains: db.get('domains').filter({ placeId: Number(placeID) }).value()
  })
})

export default router;
