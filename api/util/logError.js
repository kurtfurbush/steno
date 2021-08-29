// Entry point for logging to various data sinks

function logError(...args) {
  // eslint-disable-next-line no-console
  console.error(args);
}

module.exports = logError;
