/* eslint-disable max-len */
const csv = require('csvtojson');
const logError = require('../../util/logError.js');

const jobsFilePath = './src/repos/data/jobs.csv';

// Abstracting this to csv file fetching for now. Would persist to durable storage vs re-processing.
async function getJobData() {
  return csv().fromFile(jobsFilePath);
}
//

async function getUpcomingJobs() {
  try {
    const jobs = await getJobData();
    const upcomingJobs = jobs.filter((job) => !job.provider_id); // Would support filtering in DB query
    return upcomingJobs;
  } catch (error) {
    logError('error fetching upcoming jobs', error);
    throw error;
  }
}

async function getCompletedJobs() {
  try {
    const jobs = await getJobData();
    const completedJobs = jobs.filter((job) => job.status === 'COMPLETE'); // Would support filtering in DB query
    return completedJobs;
  } catch (error) {
    logError('error fetching completed jobs', error);
    throw error;
  }
}

async function getJobById(jobId) {
  try {
    const jobs = await getJobData();
    const job = jobs.filter((job) => job.id === jobId)[0]; // Would support filtering in DB query
    return job;
  } catch (error) {
    logError('error fetching completed jobs', error);
    throw error;
  }
}

module.exports = {
  getUpcomingJobs,
  getCompletedJobs,
  getJobById,
};
