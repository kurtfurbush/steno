const geolib = require('geolib');
const lodash = require('lodash');
const differenceInBusinessDays = require('date-fns/differenceInBusinessDays')
const { getProviders } = require("../repos/providers.js");
const { getCompletedJobs, getJobById } = require("../repos/job.js");
const logError = require('../../util/logError.js');

const getLocationRank = ({ job, providers }) => {
    if (job.location_type === 'REMOTE') {
        return null;
    }

    const ranked = geolib.orderByDistance(job, providers);
    return ranked;
}

const getSpeedRank = ({ completedJobs }) => {
    const stats = completedJobs.reduce((prev, { provider_id, datetime, materials_turned_in_at }) => {
        prev[provider_id] = [
            ...prev(prev[provider_id] || []),
            differenceInBusinessDays(datetime, materials_turned_in_at),
        ]
    }, {});

    const averages = Object.entries(stats).map(([ provider_id, times ]) => ({ provider_id, averageTime: Math.average(times) }));
    const ranked = lodash.sortBy(averages, 'averageTime');
    return ranked;
}

const getCostRank = ({ completedJobs }) => {
    const stats = completedJobs.reduce((prev, { provider_id, avg_cost_per_page }) => {
        prev[provider_id] = [
            ...prev(prev[provider_id] || []),
            avg_cost_per_page,
        ]
    }, {});

    const averages = Object.entries(stats).map(([ provider_id, cost ]) => ({ provider_id, averageCost: Math.average(cost) }));
    const ranked = lodash.sortBy(averages, 'averageCost');
    return ranked;
}

async function rankProvidersByJob({ jobId }) {
    try {
        const [
            job,
            providers,
            completedJobs,
        ] = await Promise.all([
            getJobById(jobId),
            getProviders(),
            getCompletedJobs(),
        ]);
        // TODO move this stat stuff out
        const locationRanked = getLocationRank({ job, providers });
        const speedRanked = getSpeedRank({ completedJobs });
        const costRanked = getCostRank({ completedJobs });

        // TODO solve weight
        const rankedProviders = providers;
        return { job, rankedProviders, completedJobs, locationRanked, speedRanked, costRanked };
    } catch (error) {
        logError('error fetching upcoming jobs', error);
        throw error;
    }
}

module.exports = {
    rankProvidersByJob
};