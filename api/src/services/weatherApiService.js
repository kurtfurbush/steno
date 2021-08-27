import weatherApiKey from '../secrets/weatherApiKey.js';
import getZipCoordinates from '../../util/getZipCoordinates.js';
import logError from '../../util/logError.js';
import fetch from '../../util/fetch.js';

const baseWeatherApiUrl = 'https://api.openweathermap.org/data/2.5';
const forecastRoute = '/forecast';
const oneCallRoute = '/onecall';

const unitsParam = { units: 'imperial' };
const apiKeyParam = { appId: weatherApiKey };
const getCoordinatesParams = (coordinates = []) => ({
  lat: coordinates[0],
  lon: coordinates[1],
});

const getFullRoute = ({ route, coordinates = [] }) => {
  const fullRoute = `${baseWeatherApiUrl}${route}`;
  const query = new URLSearchParams({
    ...apiKeyParam,
    ...unitsParam,
    ...(getCoordinatesParams(coordinates)),
  });
  return `${fullRoute}?${query.toString()}`;
};

const getForecastUrl = (coordinates = []) => getFullRoute({ route: forecastRoute, coordinates });
const getOneCallUrl = (coordinates = []) => getFullRoute({ route: oneCallRoute, coordinates });

// eslint-disable-next-line import/prefer-default-export
export async function getWeatherForecast(zip) {
  try {
    const coordinates = getZipCoordinates(zip);
    const [
      oneCallResponse,
      forecastResponse,
    ] = await Promise.all([
      fetch({ url: getOneCallUrl(coordinates) }),
      fetch({ url: getForecastUrl(coordinates) }),
    ]);

    const transformedDaily = oneCallResponse.daily?.slice(0, 5).map((day) => ({
      dt: day.dt,
      maxTemp: day.temp.max,
      minTemp: day.temp.min,
      uvi: day.uvi,
      description: day.weather?.[0].main,
      icon: day.weather?.[0].icon,
    }));

    const transformedDetail = forecastResponse.list?.map((entry) => ({
      dt: entry.dt,
      temp: entry.main.temp,
      pop: entry.pop,
      wind: entry.wind.speed,
      description: entry.weather?.[0].main,
      icon: entry.weather?.[0].icon,
    }));

    const result = {
      daily: transformedDaily,
      detail: transformedDetail,
      city: forecastResponse.city?.name,
      country: forecastResponse.city?.country,
    };

    return result;
  } catch (error) {
    logError('error fetching daily weather', error);
    throw error;
  }
}
