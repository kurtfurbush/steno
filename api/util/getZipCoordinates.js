import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const zipCoordinates = require('../data/zipCoordinates.json');

export default function getZipCoordinates(zip) {
  return zipCoordinates[zip];
}
