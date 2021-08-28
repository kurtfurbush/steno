/* eslint-disable max-len */
const geolib = require('geolib');
const sortBy = require('lodash/sortBy');
const differenceInBusinessDays = require('date-fns/differenceInBusinessDays');
const { getProviders } = require('../repos/providers.js');
const { getCompletedJobs, getJobById } = require('../repos/job.js');
const logError = require('../../util/logError.js');

// Would DRY this up with more time

const sum = (array = []) => array.reduce((a, b) => a + b, 0);
const average = (array = []) => sum(array) / array.length;

const RatingAverageWeight = 0.24;
const RatingCountWeight = 0.10;
const CostWeight = 0.30;
const SpeedWeight = 0.26;
const DistanceWeight = 0.10;

const getLocationRank = ({ job, providers }) => {
  if (job.location_type === 'REMOTE') {
    return [];
  }

  const distances = providers.map((provider) => ({
    provider_id: provider.id,
    distance: provider.latitude && provider.longitude
      ? (geolib.getDistance(provider, job) ?? 0) / 1000
      : null,
  }));
  const ranked = sortBy(distances, 'distance');
  return ranked;
};

// Refactor these to more efficient processing
const getRatingAverageRanked = ({ completedJobs }) => {
  const stats = completedJobs.reduce((prev, { provider_id, provider_rating = '' }) => {
    if (provider_rating !== '') {
      prev[provider_id] = [
        ...(prev[provider_id] || []),
        +provider_rating,
      ];
    }
    return prev;
  }, {});

  const averages = Object.entries(stats).map(([provider_id, ratings]) => ({ provider_id, averageRating: average(ratings) }));
  const ranked = sortBy(averages, 'averageRating').reverse();
  return ranked;
};

const getRatingCountRanked = ({ completedJobs }) => {
  const stats = completedJobs.reduce((prev, { provider_id, provider_rating = '' }) => {
    if (provider_rating !== '') {
      prev[provider_id] = (prev[provider_id] || 0) + 1;
    }
    return prev;
  }, {});

  const count = Object.entries(stats).map(([provider_id, ratingCount]) => ({ provider_id, ratingCount }));
  const ranked = sortBy(count, 'ratingCount').reverse();
  return ranked;
};

const getSpeedRank = ({ completedJobs }) => {
  const stats = completedJobs.reduce((prev, { provider_id, datetime, materials_turned_in_at }) => {
    prev[provider_id] = [
      ...(prev[provider_id] || []),
      differenceInBusinessDays(new Date(materials_turned_in_at), new Date(datetime)),
    ];
    return prev;
  }, {});

  const averages = Object.entries(stats).map(([provider_id, times]) => ({ provider_id, averageTime: average(times) }));
  const ranked = sortBy(averages, 'averageTime');
  return ranked;
};

const getCostRank = ({ completedJobs }) => {
  const stats = completedJobs.reduce((prev, { provider_id, avg_cost_per_page }) => {
    prev[provider_id] = [
      ...(prev[provider_id] || []),
      +avg_cost_per_page,
    ];
    return prev;
  }, {});

  const averages = Object.entries(stats).map(([provider_id, cost]) => ({ provider_id, averageCost: average(cost) }));
  const ranked = sortBy(averages, 'averageCost');
  return ranked;
};

async function rankProvidersByJob(jobId) {
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
    const locationRanked = getLocationRank({ job, providers });
    const ratingAverageRanked = getRatingAverageRanked({ completedJobs });
    const ratingCountRanked = getRatingCountRanked({ completedJobs });
    const speedRanked = getSpeedRank({ completedJobs });
    const costRanked = getCostRank({ completedJobs });

    const transformedLocationRanked = locationRanked.reduce((prev, { provider_id, distance }, index) => {
      prev[provider_id] = {
        rank: index + 1,
        distance,
      };
      return prev;
    }, {});
    const transformedRatingAverageRanked = ratingAverageRanked.reduce((prev, { provider_id, averageRating }, index) => {
      prev[provider_id] = {
        rank: index + 1,
        averageRating,
      };
      return prev;
    }, {});
    const transformedRatingCountRanked = ratingCountRanked.reduce((prev, { provider_id, ratingCount }, index) => {
      prev[provider_id] = {
        rank: index + 1,
        ratingCount,
      };
      return prev;
    }, {});
    const transformedSpeedRanked = speedRanked.reduce((prev, { provider_id, averageTime }, index) => {
      prev[provider_id] = {
        rank: index + 1,
        averageTime,
      };
      return prev;
    }, {});
    const transformedCostRanked = costRanked.reduce((prev, { provider_id, averageCost }, index) => {
      prev[provider_id] = {
        rank: index + 1,
        averageCost,
      };
      return prev;
    }, {});

    const providerCount = providers.length;
    const rankedProviders = providers.map((provider) => {
      const locationRankEntry = transformedLocationRanked[+provider.id];
      const ratingAverageRankEntry = transformedRatingAverageRanked[+provider.id];
      const ratingCountRankEntry = transformedRatingCountRanked[+provider.id];
      const speedRankEntry = transformedSpeedRanked[+provider.id];
      const costRankEntry = transformedCostRanked[+provider.id];
      // TODO handle bad numbers better
      // TODO handle no location (30km penalty arbitrary for now) // if this defaults to 0, should be fine for "remote" cases
      const fullRanking = costRankEntry
        ? ((locationRankEntry?.distance || 30) * DistanceWeight)
            + ((ratingAverageRankEntry?.averageRating || 0) * RatingAverageWeight)
            + ((ratingCountRankEntry?.ratingCount || 0) * RatingCountWeight)
            + ((speedRankEntry?.rank || providerCount) * SpeedWeight)
            + ((costRankEntry?.rank || providerCount) * CostWeight)
        : null;
      return {
        id: provider.id,
        full_name: provider.full_name,
        fullRanking,
        distance: locationRankEntry?.distance,
        averageRating: ratingAverageRankEntry?.averageRating,
        ratingCount: ratingCountRankEntry?.ratingCount,
        averageTime: speedRankEntry?.averageTime,
        averageCost: costRankEntry?.averageCost,
      };
    });
    return sortBy(rankedProviders, 'fullRanking');
  } catch (error) {
    logError('error fetching upcoming jobs', error);
    throw error;
  }
}

module.exports = {
  rankProvidersByJob
};
