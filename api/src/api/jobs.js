const router = require('express').Router(); 
const logError = require('../../util/logError.js');
const { getUpcomingJobs } =  require('../repos/job.js');

router.get('/upcoming', async (req, res) => {
  try {
    const response = await getUpcomingJobs();
    res.json(response);
  } catch (error) {
    logError(error);
    res.status(500);
    res.json({ message: 'Unable to fetch jobs', });
  }
});

module.exports =  router;
