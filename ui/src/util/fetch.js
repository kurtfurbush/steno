import identity from './identity.js';
import logError from './logError.js';

// Abstract the specific fetch lib / process from the caller
export default function genericFetch({ url, params = {}, transform = identity }) {
  return fetch(url, {
    ...params,
  })
    .then((res) => {
      if (res.status >= 500 && res.status < 600) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then((data) => transform(data))
    .catch((error) => {
      logError(error);
    });
}
