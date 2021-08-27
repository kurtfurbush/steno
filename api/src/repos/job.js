const csv = require('csvtojson')
const logError =  require('../../util/logError.js');

const jobsFilePath = './src/repos/data/jobs.csv';
const providersFilePath = './src/repos/data/providers.csv';

async function getUpcomingJobs() {
  try {
    const [
      jobsJson,
      providersJson,
    ] = await Promise.all([
      csv().fromFile(jobsFilePath),
      csv().fromFile(providersFilePath),
    ]);

    return { jobsJson, providersJson };
  } catch (error) {
    logError('error fetching upcoming jobs', error);
    throw error;
  }
}

module.exports = {
  getUpcomingJobs
};