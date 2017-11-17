const $trumpContainer = document.querySelector('#trump-container');
const $generate = document.querySelector('#generate');
const $choices = document.querySelector('#choose-combo');
const $back = document.querySelector('#back');
const $question = document.querySelector('.question');
const $cross = document.querySelector('.cross');
const $howItWorks = document.querySelector('#how-it-works');

$question.addEventListener('click', () => {
  $howItWorks.className = '';
});

$cross.addEventListener('click', () => {
  $howItWorks.className = 'hide';
});

$back.addEventListener('click', () => {
  $choices.className = '';
  $generate.className = 'hide';
  $trumpContainer.className = 'hide';
  $back.className = 'hide';
});

const setTrumpText = (text) => {
  $trumpContainer.innerHTML = text;
};

module.exports = {
  setTrumpText,
  showChoices: () => {
    $choices.className = '';
    $generate.className = 'hide';
    $trumpContainer.className = 'hide';
    $back.className = 'hide';
  },
  showSpeech: () => {
    $choices.className = 'hide';
    $generate.className = '';
    $trumpContainer.className = '';
    $back.className = '';
  },
  addChoiceEvent: (choice, chooseEvent) => {
    document
      .querySelector(`#choice-${choice}`)
      .addEventListener('click', chooseEvent(choice));
  },
  setGenerateTextFunc: (event) => {
    $generate.addEventListener('click', () => setTrumpText(event()));
  }
};
