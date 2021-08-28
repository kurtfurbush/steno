const router = require('express').Router();
const logError = require('../../util/logError.js');
const { getUpcomingJobs } = require('../repos/job.js');
const { rankProvidersByJob } = require('../services/providerRankings.js');

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

router.get('/suggestedProviders', async (req, res) => {
  try {
    const { jobId } = req.query;
    const providers = await rankProvidersByJob(jobId);
    res.json(providers);
  } catch (error) {
    logError(error);
    res.status(500);
    res.json({ message: 'Unable to fetch jobs', });
  }
});

module.exports = router;
