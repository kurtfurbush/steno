import { Router } from 'express';
import { getWeatherForecast } from '../services/weatherApiService.js';

const router = Router();

// support variable number of days, languages, unit types, etc.
// eslint-disable-next-line no-useless-escape
router.get('/daily/:zip', async (req, res) => {
  const { zip } = req.params;

  if (!zip) {
    res.status(400);
    res.json({ message: 'Zip code is required', });
    return;
  }

  try {
    const response = await getWeatherForecast(zip);
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json({ message: 'Unable to fetch weather', });
  }
});

export default router;
