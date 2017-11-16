const Markov = require('markov-chains-text').default;
const getTrainingData = require('./get-training-data');
const { genArray, rndIntB } = require('creative-code-toolkit');

getTrainingData()
  .then(trainingData => {
    const trumpChain = new Markov(trainingData);
    genArray(rndIntB(1, 10))
      .map(() => trumpChain.makeSentence())
      .forEach(sentence => console.log(sentence));
  });

