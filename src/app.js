import trainingData from '../data/trump/combined.txt';
import jesus from '../data/jesus/jesus.txt';
import hitler from '../data/hitler/hitler.txt';
import Markov from 'markov-chains-text';
import { genArray, rndIntB, choose } from 'creative-code-toolkit';

const data = {
  jesus,
  hitler
};

let trumpChain;
const $trumpContainer = document.querySelector('#trump-container');
const $generate = document.querySelector('#generate');
const $choices = document.querySelector('#choose-combo');
const $question = document.querySelector('.question');
const $cross = document.querySelector('.cross');
const $howItWorks = document.querySelector('#how-it-works');

$question.addEventListener('click', () => {
  $howItWorks.className = '';
});

$cross.addEventListener('click', () => {
  $howItWorks.className = 'hide';
});

const chooseEvent = (chosenType) => () => {
  trumpChain = new Markov(trainingData + '\n' + data[chosenType]);
  $choices.className = 'hide';
  $generate.className = '';
  $trumpContainer.className = '';
  $trumpContainer.innerHTML = getTrumpText();
};

document.querySelector('#choice-hitler').addEventListener('click', chooseEvent('hitler'));
document.querySelector('#choice-jesus').addEventListener('click', chooseEvent('jesus'));

const getTrumpText = () => {
  const createText = () =>
    genArray(rndIntB(2, 8))
      .map(() => trumpChain.makeSentence())
      .reduce((speech, sentence) => `${speech}${sentence}${Math.random() > 0.25 ? ' ' : '<br>'}`, '');

  const trumpSpeech = 'My fellow Americans. ' + createText();
  return `<div class="trump-text">My fellow Americans.<br>${createText()}</div>`;
};

$generate.addEventListener('click', () => {
  $trumpContainer.innerHTML = getTrumpText();
});