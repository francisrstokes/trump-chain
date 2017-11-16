const Markov = require('markov-chains-text').default;
const getTrainingData = require('./get-training-data');
const { genArray, rndIntB } = require('creative-code-toolkit');

getTrainingData()
  .then(trainingData => {
    const trumpChain = new Markov(trainingData);

    const createParagraph = () =>
      genArray(rndIntB(1, 8))
        .map(() => trumpChain.makeSentence())
        .reduce((speech, sentence) => `${speech} ${sentence}`, '');

    const trumpSpeech = 'My fellow Americans. ' + genArray(rndIntB(1, 5))
      .map(createParagraph)
      .join('\n');

    console.log(trumpSpeech);
  });

