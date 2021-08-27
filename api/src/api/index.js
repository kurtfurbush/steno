import { Router } from 'express';
import weather from './weather.js';

const router = Router();

router.get('/', (_, res) => {
  res.status(400);
  res.json({
    message: 'Try a supported route',
  });
});

router.use('/weather', weather);

export default router;
