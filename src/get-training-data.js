const promisifyAll = require('./promisify-all');
const path = require('path');
const {readFileAsync, readdirAsync} = promisifyAll(require('fs'));

module.exports = async () => {
  const files = await readdirAsync(path.join(__dirname, '../data'));

  let trainingData = '';
  for (file of files) {
    const fileData = await readFileAsync(path.join(__dirname, '../data', file), 'utf8');
    trainingData += fileData + '\n';
  }

  return trainingData;
};
