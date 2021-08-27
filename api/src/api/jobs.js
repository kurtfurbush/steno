import { Router } from 'express';
import { getWeatherForecast as getUpcomingJobs } from '../services/weatherApiService.js';

const router = Router();

router.get('/upcoming', async (req, res) => {
  try {
    const response = await getUpcomingJobs();
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Unable to fetch jobs', });
  }
});

export default router;
