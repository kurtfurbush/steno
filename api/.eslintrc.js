module.exports = {
  env: {
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  globals: {
    fetch: 'writable',
  },
  extends: 'airbnb-base',
  rules: {
    'import/extensions': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
    'linebreak-style': 0,
  },
};
