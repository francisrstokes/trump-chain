import Markov from 'markov-chains-text';
import { genArray, rndIntB, choose } from 'creative-code-toolkit';
import data from '../data';
import view from './view';

let trumpChain;
const chooseEvent = (chosenType) => () => {
  trumpChain = new Markov(data.trump + '\n' + data[chosenType]);
  view.showSpeech();
  view.setTrumpText(getTrumpText());
};

const getTrumpText = () => {
  const createText = () =>
    genArray(rndIntB(2, 8))
      .map(() => trumpChain.makeSentence())
      .reduce((speech, sentence) => `${speech}${sentence}${Math.random() > 0.25 ? ' ' : '<br>'}`, '');

  const trumpSpeech = 'My fellow Americans. ' + createText();
  return `<div class="trump-text">My fellow Americans.<br>${createText()}</div>`;
};

view.addChoiceEvent('hitler', chooseEvent);
view.addChoiceEvent('jesus', chooseEvent);
view.setGenerateTextFunc(getTrumpText);