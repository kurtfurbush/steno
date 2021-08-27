import { Router } from 'express';
import jobs from './jobs.js';

const router = Router();

router.get('/', (_, res) => {
  res.status(400);
  res.json({
    message: 'Try a supported route',
  });
});

router.use('/jobs', jobs);

export default router;
