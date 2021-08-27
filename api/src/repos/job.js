const csv = require('csvtojson')
const logError =  require('../../util/logError.js');

const jobsFilePath = './src/repos/data/jobs.csv';
const providersFilePath = './src/repos/data/providers.csv';

// Abstracting this to csv file fetching for now. Would persist to durable storage vs re-processing.
async function getJobs() {
  return await csv().fromFile(jobsFilePath);
}

async function getProviders() {
  return await csv().fromFile(providersFilePath);
}
//

async function getUpcomingJobs() {
  try {
    const jobs = await getJobs();
    const upcomingJobs = jobs.filter(job => !job.provider_id); // Would support filtering in DB query
    return upcomingJobs;
  } catch (error) {
    logError('error fetching upcoming jobs', error);
    throw error;
  }
}

async function getCompletedJobs() {
  try {
    const jobs = await getJobs();
    const completedJobs = jobs.filter(job => job.status === 'COMPLETE'); // Would support filtering in DB query
    return completedJobs;
  } catch (error) {
    logError('error fetching completed jobs', error);
    throw error;
  }
}

module.exports = {
  getUpcomingJobs,
  getCompletedJobs,
};