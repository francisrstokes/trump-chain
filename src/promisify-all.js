const { promisify } = require('util');
module.exports = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'function') {
      acc[`${key}Async`] = promisify(obj[key]);
    }
    return acc;
  }, {});
};
