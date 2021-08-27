const csv = require('csvtojson')
const logError =  require('../../util/logError.js');

const providersFilePath = './src/repos/data/providers.csv';

// Abstracting this to csv file fetching for now. Would persist to durable storage vs re-processing.
async function getProviderData() {
  return await csv().fromFile(providersFilePath);
}
//

async function getProviders() {
  try {
    const providers = await getProviderData();
    return providers;
  } catch (error) {
    logError('error fetching providers', error);
    throw error;
  }
}

module.exports = {
  getProviders
};