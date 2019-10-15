import { Router } from 'express';
const router = Router();

// import adminRouter from './admin';
import placeRouter from './place';
// import searchRouter from './search';

// router.use('/admin', adminRouter);
router.use('/place', placeRouter);
// router.use('/search', searchRouter);

module.exports = router;
