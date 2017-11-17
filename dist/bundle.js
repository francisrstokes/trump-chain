/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _markovChainsText = _interopRequireDefault(__webpack_require__(1));

var _creativeCodeToolkit = __webpack_require__(13);

var _data = _interopRequireDefault(__webpack_require__(14));

var _view = _interopRequireDefault(__webpack_require__(18));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trumpChain;

var chooseEvent = function chooseEvent(chosenType) {
  return function () {
    trumpChain = new _markovChainsText.default(_data.default.trump + '\n' + _data.default[chosenType]);

    _view.default.showSpeech();

    _view.default.setTrumpText(getTrumpText());
  };
};

var getTrumpText = function getTrumpText() {
  var createText = function createText() {
    return (0, _creativeCodeToolkit.genArray)((0, _creativeCodeToolkit.rndIntB)(2, 8)).map(function () {
      return trumpChain.makeSentence();
    }).reduce(function (speech, sentence) {
      return "".concat(speech).concat(sentence).concat(Math.random() > 0.25 ? ' ' : '<br>');
    }, '');
  };

  var trumpSpeech = 'My fellow Americans. ' + createText();
  return "<div class=\"trump-text\">My fellow Americans.<br>".concat(createText(), "</div>");
};

_view.default.addChoiceEvent('hitler', chooseEvent);

_view.default.addChoiceEvent('jesus', chooseEvent);

_view.default.setGenerateTextFunc(getTrumpText);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sbd = __webpack_require__(2);

var _sbd2 = _interopRequireDefault(_sbd);

var _markovChains = __webpack_require__(6);

var _markovChains2 = _interopRequireDefault(_markovChains);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The defaut max ratio for how much generated sentences are allowed to overlap
 * with existing sentences
 * @constant
 * @default
 * @type {number}
 */
var DEFAULT_MAX_OVERLAP_RATIO = 0.7;

/**
 * The defaut max total number of ngrams a generated sentence can overlap with
 * existing ones
 * @constant
 * @default
 * @type {number}
 */
var DEFAULT_MAX_OVERLAP_TOTAL = 15;

/**
 * The defaut number of times to try generating a novel sentence before failure
 * @constant
 * @default
 * @type {number}
 */
var DEFAULT_TRIES = 10;

/**
 * The default state (or n-gram) size
 * @constant
 * @default
 * @type {number}
 */
var DEFAULT_STATE_SIZE = 2;

// ============================================================================

var Text = function () {
  /**
   * If no `text` is provided, overlap checking will not work.
   *
   * @param {string} [text] the text to use as a basis for the model
   * @param {Object} [config] a configuration object
   * @param {Map}    [config.chain] a pre-configured Markov chain to use
   * @param {number} [config.stateSize=DEFAULT_STATE_SIZE] the state size to use for the model
   */

  function Text(text) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var chain = _ref.chain;
    var _ref$stateSize = _ref.stateSize;
    var stateSize = _ref$stateSize === undefined ? DEFAULT_STATE_SIZE : _ref$stateSize;

    _classCallCheck(this, Text);

    var runs = this.generateCorpus(text);

    // Rejoined text lets us assess the novelty of generated sentences
    this.rejoinedText = this.joinSentences(runs.map(this.joinWords));

    this.chain = chain || new _markovChains2.default(runs, { stateSize: stateSize });
  }

  /**
   * Create a Text class by hydrating a chain that's been serialized to JSON
   *
   * @param {string} jsonData the serialized chain
   * @param {string} [text] the original text
   *
   * @return {Text} a hydrated Text instance
   */


  _createClass(Text, [{
    key: 'toJSON',


    /**
     * Rather than stringify the whole model, we only stringify the chain. Rather
     * than return an actual JSON string, we return a multidimensional array
     * which can then be consumed by `JSON.stringify`.
     *
     * @return {Array[]}
     */
    value: function toJSON() {
      return this.chain.toJSON();
    }

    /**
     * Creates a list of 'sentences', each made up of a list of 'words'. The
     * sentences are first filtered through `testSentenceInput`.
     *
     * @param {string} text the text to build the corpus from
     * @return {string[][]} the processed text
     */

  }, {
    key: 'generateCorpus',
    value: function generateCorpus(text) {
      var sentences = this.splitSentences(text);
      var runs = sentences.filter(this.testSentenceInput).map(this.splitWords);

      return runs;
    }

    /**
     * Splits a sentence into a list of words
     *
     * @param {string} sentence the original sentence
     * @return {string[]} the sentence split into words
     */

  }, {
    key: 'splitWords',
    value: function splitWords(sentence) {
      var wordSplitPattern = /\s+/;
      return sentence.split(wordSplitPattern);
    }

    /**
     * Splits text into an array of sentences
     *
     * @param {string} text the original text
     * @return {string[]} the text split into sentences
     */

  }, {
    key: 'splitSentences',
    value: function splitSentences(text) {
      return _sbd2.default.sentences(text, { sanitize: false });
    }

    /**
     * Re-joins a list of words into a sentence.
     *
     * @param {string[]} words the split sentence to rejoin
     * @return {string} the combined words
     */

  }, {
    key: 'joinWords',
    value: function joinWords(words) {
      return words.join(' ');
    }

    /**
     * Re-joins a list of sentences into a full text.
     *
     * @param {string[]} sentences
     * @return {string} the combined sentences
     */

  }, {
    key: 'joinSentences',
    value: function joinSentences(sentences) {
      return sentences.join(' ');
    }

    /**
     * A basic sentence filter for deciding whether a string should be processed
     * into the corpus.
     *
     * This one rejects sentences that contain the type of punctuation that would
     * look strange on its own in a randomly-generated sentence.
     *
     * @param {string} sentence the sentence to check
     * @return {boolean} whether the sentence passes the filter
     */

  }, {
    key: 'testSentenceInput',
    value: function testSentenceInput(sentence) {
      var rejectPattern = /(^')|('$)|\s'|'\s|[\"(\(\)\[\])]/;
      return !rejectPattern.test(sentence);
    }

    /**
     * Tests generated sentences to make sure they don't overlap too much with
     * existing sentences.
     *
     * @param {string[]} words the sentence split into words
     * @param {number} maxOverlapRatio The max ratio for how much generated sentences are allowed to overlap with existing sentences
     * @param {number} maxOverlapTotal The max total number of ngrams a generated sentence can overlap with existing ones
     * @return {boolean} whether the sentence passes the filter
     */

  }, {
    key: 'testSentenceOutput',
    value: function testSentenceOutput(words) {
      var _this = this;

      var maxOverlapRatio = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_MAX_OVERLAP_RATIO : arguments[1];
      var maxOverlapTotal = arguments.length <= 2 || arguments[2] === undefined ? DEFAULT_MAX_OVERLAP_TOTAL : arguments[2];

      var overlapRatio = Math.round(maxOverlapRatio * words.length);
      var overlapMax = Math.min(overlapRatio, maxOverlapTotal);
      var overlapOver = overlapMax + 1;

      var gramCount = Math.max(words.length - overlapMax, 1);
      var grams = new Array(gramCount);

      for (var i = 0; i < gramCount; i++) {
        grams[i] = words.slice(i, i + overlapOver);
      }

      return grams.every(function (gram) {
        var joinedGram = _this.joinWords(gram);
        return !_this.rejoinedText.includes(joinedGram);
      });
    }

    /**
     *  Attempts `tries` number of times to generate a valid sentence (i.e. ones
     *  that can pass `testSentenceOutput`).
     *
     *  @param {(string|string[])} [startFrom] The text to begin generating the corpus from
     *  @param {Object} [startFrom] The text to begin generating the corpus from
     *  @param {number} [startFrom.tries=DEFAULT_TRIES] How many times to attempt generating a sentence
     *  @param {number} [startFrom.maxOverlapRatio] The max ratio for how much generated sentences are allowed to overlap with existing sentences
     *  @param {number} [startFrom.maxOverlapTotal] The max total number of ngrams a generated sentence can overlap with existing ones
     *  @param {number} [startFrom.maxChars] The max length (inclusive) limit for that a sentence can be. If specified, generated sentences must be <= `maxLength`
     *  @return {(string|Error)} the generated sentence, or an error if it is unable to generate an adquate sentence
     */

  }, {
    key: 'makeSentence',
    value: function makeSentence(startFrom) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var initState = void 0;

      // handle overloading
      if (Array.isArray(startFrom)) {
        initState = startFrom;
      } else if (typeof startFrom === 'string') {
        initState = this.splitWords(startFrom);
      } else if (isPlainObject(startFrom)) {
        Object.assign(opts, startFrom);
      }

      var _opts$tries = opts.tries;
      var tries = _opts$tries === undefined ? DEFAULT_TRIES : _opts$tries;
      var maxOverlapRatio = opts.maxOverlapRatio;
      var maxOverlapTotal = opts.maxOverlapTotal;
      var maxChars = opts.maxChars;


      for (var i = 0; i < tries; i++) {
        var words = this.chain.walk(initState);

        if (this.testSentenceOutput(words, maxOverlapRatio, maxOverlapTotal)) {
          var sentence = initState ? this.joinWords([].concat(_toConsumableArray(initState), _toConsumableArray(words))) : this.joinWords(words);

          if (maxChars && sentence.length > maxChars) {
            continue;
          }

          return sentence;
        }
      }

      return new Error('Unable to create sufficiently original sentence after ' + tries + ' tries');
    }
  }], [{
    key: 'fromJSON',
    value: function fromJSON(jsonData, text) {
      var chain = _markovChains2.default.fromJSON(jsonData);
      return new Text(text, { chain: chain });
    }
  }]);

  return Text;
}();

// ============================================================================

/**
 * @private
 * Determines whether the provided value is an object.
 *
 * This is used to determine whether something is a configuration object.  It's
 * not perfect -- `isPlainObject(/foo/)` returns `true`, for example -- but it
 * should cover our bases well enough for what we need.
 *
 * @param {} value the value to check
 * @return {boolean} whether the value is a plain-ish object
 */


exports.default = Text;
function isPlainObject(value) {
  // Because `typeof null === 'object'` returns `true`, we cast `value` to a
  // boolean using `!!` to ensure that we don't get a false positive if `value`
  // is `null`.
  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jshint node:true, laxcomma:true */


var sanitizeHtml = __webpack_require__(3);

var String = __webpack_require__(4);
var Match  = __webpack_require__(5);

var newline_placeholder = " @~@ ";
var newline_placeholder_t = newline_placeholder.trim();


// Split the entry into sentences.
exports.sentences = function(text, user_options) {
    if (!text || typeof text !== "string" || !text.length) {
        return [];
    }

    var options = {
        "newline_boundaries"  : false,
        "html_boundaries"     : false,
        "html_boundaries_tags": ["p","div","ul","ol"],
        "sanitize"            : false,
        "allowed_tags"        : false,
        "abbreviations"       : null
    };

    if (typeof user_options === "boolean") {
        // Deprecated quick option
        options.newline_boundaries = true;
    }
    else {
        // Extend options
        for (var k in user_options) {
            options[k] = user_options[k];
        }
    }

    Match.setAbbreviations(options.abbreviations);

    if (options.newline_boundaries) {
        text = text.replace(/\n+|[-#=_+*]{4,}/g, newline_placeholder);
    }

    if (options.html_boundaries) {
        var html_boundaries_regexp = "(<br\\s*\\/?>|<\\/(" + options.html_boundaries_tags.join("|") + ")>)";
        var re = new RegExp(html_boundaries_regexp, "g");
        text = text.replace(re, "$1" + newline_placeholder);
    }

    if (options.sanitize || options.allowed_tags) {
        if (! options.allowed_tags) {
            options.allowed_tags = [""];
        }

        text = sanitizeHtml(text, { "allowedTags" : options.allowed_tags });
    }

    // Split the text into words
    // - see http://blog.tompawlak.org/split-string-into-tokens-javascript
    var words = text.trim().match(/\S+|\n/g);

    var wordCount = 0;
    var index = 0;
    var temp  = [];
    var sentences = [];
    var current   = [];

    // If given text is only whitespace (or nothing of \S+)
    if (!words || !words.length) {
        return [];
    }

    for (var i=0, L=words.length; i < L; i++) {
        wordCount++;

        // Add the word to current sentence
        current.push(words[i]);

        // Sub-sentences, reset counter
        if (~words[i].indexOf(',')) {
            wordCount = 0;
        }

        if (Match.isBoundaryChar(words[i])      ||
            String.endsWithChar(words[i], "?!") ||
            words[i] === newline_placeholder_t)
        {
            if ((options.newline_boundaries || options.html_boundaries) && words[i] === newline_placeholder_t) {
                current.pop();
            }

            sentences.push(current);

            wordCount = 0;
            current   = [];

            continue;
        }


        if (String.endsWithChar(words[i], "\"") || String.endsWithChar(words[i], "”")) {
            // endQuote = words[i].slice(-1);
            words[i] = words[i].slice(0, -1);
        }

        // A dot might indicate the end sentences
        // Exception: The next sentence starts with a word (non abbreviation)
        //            that has a capital letter.
        if (String.endsWithChar(words[i], '.')) {
            // Check if there is a next word
            // This probably needs to be improved with machine learning
            if (i+1 < L) {
                // Single character abbr.
                if (words[i].length === 2 && isNaN(words[i].charAt(0))) {
                    continue;
                }

                // Common abbr. that often do not end sentences
                if (Match.isCommonAbbreviation(words[i])) {
                    continue;
                }

                // Next word starts with capital word, but current sentence is
                // quite short
                if (Match.isSentenceStarter(words[i+1])) {
                    if (Match.isTimeAbbreviation(words[i], words[i+1])) {
                        continue;
                    }

                    // Dealing with names at the start of sentences
                    if (Match.isNameAbbreviation(wordCount, words.slice(i, 6))) {
                        continue;
                    }

                    if (Match.isNumber(words[i+1])) {
                        if (Match.isCustomAbbreviation(words[i])) {
                            continue;
                        }
                    }
                }
                else {
                    // Skip ellipsis
                    if (String.endsWith(words[i], "..")) {
                        continue;
                    }

                    //// Skip abbreviations
                    // Short words + dot or a dot after each letter
                    if (Match.isDottedAbbreviation(words[i])) {
                        continue;
                    }

                    if (Match.isNameAbbreviation(wordCount, words.slice(i, 5))) {
                        continue;
                    }
                }
            }

            sentences.push(current);
            current   = [];
            wordCount = 0;

            continue;
        }

        // Check if the word has a dot in it
        if ((index = words[i].indexOf(".")) > -1) {
            if (Match.isNumber(words[i], index)) {
                continue;
            }

            // Custom dotted abbreviations (like K.L.M or I.C.T)
            if (Match.isDottedAbbreviation(words[i])) {
                continue;
            }

            // Skip urls / emails and the like
            if (Match.isURL(words[i]) || Match.isPhoneNr(words[i])) {
                continue;
            }
        }

        if (temp = Match.isConcatenated(words[i])) {
            current.pop();
            current.push(temp[0]);
            sentences.push(current);

            current = [];
            wordCount = 0;
            current.push(temp[1]);
        }
    }

    if (current.length) {
        sentences.push(current);
    }

    /** After processing */
    var result   = [];
    var sentence = "";

    // Clear "empty" sentences
    sentences = sentences.filter(function(s) {
        return s.length > 0;
    });

    for (var i=0; i < sentences.length; i++) {
        sentence = sentences[i].join(" ");

        // Single words, could be "enumeration lists"
        if (sentences[i].length === 1 && sentences[i][0].length < 4 &&
            sentences[i][0].indexOf('.') > -1)
        {
            // Check if there is a next sentence
            // It should not be another list item
            if (sentences[i+1] && sentences[i+1][0].indexOf('.') < 0) {
                sentence += " " + sentences[i+1].join(" ");
                i++;
            }
        }

        result.push(sentence);
    }

    return result;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {


module.exports = function sanitizeHtml(text, opts) {
  // Strip HTML from Text using browser HTML parser
  if (typeof text == 'string' || text instanceof String) {
    var $div = document.createElement("DIV");
    $div.innerHTML = text;
    text =  ($div.textContent || '').trim();
  }
  //DOM Object
  else if (typeof text === 'object' && text.textContent) {
    text = (text.textContent || '').trim();
  }

  return text;
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {


exports.endsWithChar = function ends_with_char(word, c) {
    if (c.length > 1) {
        return c.indexOf(word.slice(-1)) > -1;
    }

    return word.slice(-1) === c;
};

exports.endsWith = function ends_with(word, end) {
    return word.slice(word.length - end.length) === end;
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var abbreviations;
var englishAbbreviations = [
    "al",
    "adj",
    "assn",
    "Ave",
    "BSc", "MSc",
    "Cell",
    "Ch",
    "Co",
    "cc",
    "Corp",
    "Dem",
    "Dept",
    "ed",
    "eg",
    "Eq",
    "Eqs",
    "est",
    "est",
    "etc",
    "Ex",
    "ext", // + number?
    "Fig",
    "fig",
    "Figs",
    "figs",
    "i.e",
    "ie",
    "Inc",
    "inc",
    "Jan","Feb","Mar","Apr","Jun","Jul","Aug","Sep","Sept","Oct","Nov","Dec",
    "jr",
    "mi",
    "Miss", "Mrs", "Mr", "Ms",
    "Mol",
    "mt",
    "mts",
    "no",
    "Nos",
    "PhD", "MD", "BA", "MA", "MM",
    "pl",
    "pop",
    "pp",
    "Prof", "Dr",
    "pt",
    "Ref",
    "Refs",
    "Rep",
    "repr",
    "rev",
    "Sec",
    "Secs",
    "Sgt", "Col", "Gen", "Rep", "Sen",'Gov', "Lt", "Maj", "Capt","St",
    "Sr", "sr", "Jr", "jr", "Rev",
    "Sun","Mon","Tu","Tue","Tues","Wed","Th","Thu","Thur","Thurs","Fri","Sat",
    "trans",
    "Univ",
    "Viz",
    "Vol",
    "vs",
    "v",
];

exports.setAbbreviations = function(abbr) {
    if(abbr){
        abbreviations = abbr;
    } else {
        abbreviations = englishAbbreviations;
    }
}

exports.isCapitalized = function(str) {
    return /^[A-Z][a-z].*/.test(str) || this.isNumber(str);
}

// Start with opening quotes or capitalized letter
exports.isSentenceStarter = function(str) {
    return this.isCapitalized(str) || /``|"|'/.test(str.substring(0,2));
}

exports.isCommonAbbreviation = function(str) {
    return ~abbreviations.indexOf(str.replace(/\W+/g, ''));
}

// This is going towards too much rule based
exports.isTimeAbbreviation = function(word, next) {
    if (word === "a.m." || word === "p.m.") {
        var tmp = next.replace(/\W+/g, '').slice(-3).toLowerCase();

        if (tmp === "day") {
            return true;
        }
    }

    return false;
}

exports.isDottedAbbreviation = function(word) {
    var matches = word.replace(/[\(\)\[\]\{\}]/g, '').match(/(.\.)*/);
    return matches && matches[0].length > 0;
}

// TODO look for next words, if multiple capitalized -> not sentence ending
exports.isCustomAbbreviation = function(str) {
    if (str.length <= 3) {
        return true;
    }

    return this.isCapitalized(str);
}

// Uses current word count in sentence and next few words to check if it is
// more likely an abbreviation + name or new sentence.

// ~ TODO Perhaps also consider prev. word?
exports.isNameAbbreviation = function(wordCount, words) {
    if (words.length > 0) {
        if (wordCount < 5 && words[0].length < 6 && this.isCapitalized(words[0])) {
            return true;
        }

        var capitalized = words.filter(function(str) {
            return /[A-Z]/.test(str.charAt(0));
        });

        return capitalized.length >= 3;
    }

    return false;
}

exports.isNumber = function(str, dotPos) {
    if (dotPos) {
        str = str.slice(dotPos-1, dotPos+2);
    }

    return !isNaN(str);
};

// Phone number matching
// http://stackoverflow.com/a/123666/951517
exports.isPhoneNr = function(str) {
    return str.match(/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/);
};

// Match urls / emails
// http://stackoverflow.com/a/3809435/951517
exports.isURL = function(str) {
    return str.match(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
};

// Starting a new sentence if beginning with capital letter
// Exception: The word is enclosed in brackets
exports.isConcatenated = function(word) {
    var i = 0;

    if ((i = word.indexOf(".")) > -1 ||
        (i = word.indexOf("!")) > -1 ||
        (i = word.indexOf("?")) > -1)
    {
        var c = word.charAt(i + 1);

        // Check if the next word starts with a letter
        if (c.match(/[a-zA-Z].*/)) {
            return [word.slice(0, i), word.slice(i+1)];
        }
    }

    return false;
};

exports.isBoundaryChar = function(word) {
    return word === "." ||
           word === "!" ||
           word === "?";
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _javascriptStringify = __webpack_require__(7);

var _javascriptStringify2 = _interopRequireDefault(_javascriptStringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Constants used to pad states from the beginning and end of a corpus
 */
var BEGIN = '@@MARKOV_CHAIN_BEGIN';
var END = '@@MARKOV_CHAIN_END';

/**
 * The default state size
 */
var DEFAULT_STATE_SIZE = 1;

// ============================================================================

/**
 * A Markov chain representing processes that have both beginnings and ends.
 * For example: Sentences.
 */

var Chain = function () {
  function Chain(corpusOrModel) {
    var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref$stateSize = _ref.stateSize;
    var stateSize = _ref$stateSize === undefined ? DEFAULT_STATE_SIZE : _ref$stateSize;

    _classCallCheck(this, Chain);

    this.stateSize = stateSize;

    if (corpusOrModel instanceof Map) {
      this.model = corpusOrModel;
    } else {
      this.model = Chain.build(corpusOrModel, { stateSize: stateSize });
    }
  }

  /**
   * Creates a Map of Maps where the keys of the outer Map represent all
   * possible states, and point to the inner Map. The inner Maps represent all
   * possibilities for the 'next' item in the chain, along with the count of
   * times it appears.
   */


  _createClass(Chain, [{
    key: 'toJSON',


    /**
     * Converts the model to a 2D array, which can then be serialized by
     * JSON.stringify
     */
    value: function toJSON() {
      var serialized = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.model[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var state = _step$value[0];
          var follow = _step$value[1];

          serialized.push([state, [].concat(_toConsumableArray(follow))]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return serialized;
    }

    /**
     * Given a state, chooses the next item at random, with a bias towards next
     * states with higher weights
     */

  }, {
    key: 'move',
    value: function move(fromState) {
      var stateKey = createStateKey(fromState);
      var state = this.model.get(stateKey);

      if (!state) {
        return undefined;
      }

      var choices = [];
      var weights = [];

      state.forEach(function (follow) {
        choices.push(follow.value);
        weights.push(follow.count);
      });

      var cumulativeDistribution = weights.reduce(function (cumWeights, currWeight) {
        var sum = last(cumWeights) || 0;
        return [].concat(_toConsumableArray(cumWeights), [sum + currWeight]);
      }, []);

      var r = Math.random() * last(cumulativeDistribution);
      var randomIndex = bisect(cumulativeDistribution, r);

      var nextMove = choices[randomIndex];

      return nextMove;
    }

    /**
     * Generates successive items until the chain reaches the END state
     */

  }, {
    key: 'generate',
    value: function* generate() {
      var beginState = arguments.length <= 0 || arguments[0] === undefined ? createBeginState(this.stateSize) : arguments[0];

      var state = beginState;

      for (;;) {
        var step = this.move(state);

        if (step === undefined || step === END) {
          break;
        } else {
          yield step;
          state = [].concat(_toConsumableArray(state.slice(1)), [step]);
        }
      }
    }

    /**
     * Performs a single run of the Markov model, optionally starting from the
     * provided `beginState`
     */

  }, {
    key: 'walk',
    value: function walk(beginState) {
      var steps = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.generate(beginState)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var step = _step2.value;

          steps.push(step);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return steps;
    }
  }], [{
    key: 'build',
    value: function build(corpus) {
      var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var _ref2$stateSize = _ref2.stateSize;
      var stateSize = _ref2$stateSize === undefined ? DEFAULT_STATE_SIZE : _ref2$stateSize;

      if (!Array.isArray(corpus)) {
        throw new Error('Corpus must be a List or an Array');
      }

      var model = new Map();

      corpus.forEach(function (run) {
        if (!Array.isArray(run)) {
          throw new Error('Invalid run in corpus: Must be an array');
        }

        var paddedRun = [].concat(_toConsumableArray(createBeginState(stateSize)), _toConsumableArray(run), [END]);

        // add one to original run size to account for END state
        for (var ngramStart = 0; ngramStart < run.length + 1; ngramStart++) {
          var ngramEnd = ngramStart + stateSize;

          var stateKey = createStateKey(paddedRun.slice(ngramStart, ngramEnd));
          var follow = paddedRun[ngramEnd];
          var followKey = (0, _javascriptStringify2.default)(follow);

          if (!model.has(stateKey)) {
            model.set(stateKey, new Map());
          }

          var stateMap = model.get(stateKey);

          if (!stateMap.has(followKey)) {
            stateMap.set(followKey, { value: follow, count: 0 });
          }

          var followMap = stateMap.get(followKey);
          followMap.count += 1;
        }
      });

      return model;
    }

    /**
     * Creates a Chain instance by hydrating the model from a JSON string
     */

  }, {
    key: 'fromJSON',
    value: function fromJSON(jsonData) {
      var getStateSize = function getStateSize(stateKey) {
        return JSON.parse(stateKey).length;
      };

      var stateSize = void 0;

      var states = JSON.parse(jsonData).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2);

        var stateKey = _ref4[0];
        var follow = _ref4[1];

        var currentStateSize = getStateSize(stateKey);

        // Ensure that each state in the chain has a consistent size
        if (!stateSize) {
          stateSize = currentStateSize;
        } else if (currentStateSize !== stateSize) {
          throw new Error('Inconsistent state size. ' + ('Expected ' + stateSize + ' but got ' + currentStateSize + ' (' + stateKey + ').'));
        }

        var followMap = new Map();

        // Clone the `followData` object so that the garbage collector doesn't
        // keep the temporary hydrated states array laying around because the new
        // chain references objects it contains.
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = follow[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _slicedToArray(_step3.value, 2);

            var followKey = _step3$value[0];
            var followData = _step3$value[1];

            followMap.set(followKey, Object.assign({}, followData));
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return [stateKey, followMap];
      });

      return new Chain(new Map(states), { stateSize: stateSize });
    }
  }]);

  return Chain;
}();

// ============================================================================

/**
 * Creates a state that can be used to look up transitions in the model
 */


exports.default = Chain;
function createStateKey(fromState) {
  // When the `stateSize` is one, it can seem a bit silly to have to pass in an
  // array with a single item. To make things simpler to use, we therefore
  // convert any single, non-array argument to arrays.
  var state = Array.isArray(fromState) ? fromState : [fromState];

  // Using `JSON.stringify` here allows us to programmatically determine the
  // original `stateSize` when we restore a chain from JSON. If we were to use
  // `serialize`, the stateKey array would be surrounded by single quotes, and
  // would therefore need to be parsed by `eval` in order to determine the
  // original state size. Using JSON.parse is a lot safer than using `eval`.
  return JSON.stringify(state.map(_javascriptStringify2.default));
}

/**
 * Creates inital `BEGIN` states to use for padding at the beginning of runs
 */
function createBeginState(stateSize) {
  var beginStates = new Array(stateSize);

  for (var i = 0; i < stateSize; i++) {
    beginStates[i] = BEGIN;
  }

  return beginStates;
}

/**
 * Gets the last item in an array
 */
function last(arr) {
  return arr[arr.length - 1];
}

/**
 * A port of Python's `bisect.bisect_right`, similar to lodash's `sortedIndex`
 */
function bisect(list, num) {
  var high = arguments.length <= 2 || arguments[2] === undefined ? list.length : arguments[2];

  var currLow = 0;
  var currHigh = high;

  while (currLow < currHigh) {
    var mid = Math.floor((currLow + currHigh) / 2);
    if (num < list[mid]) {
      currHigh = mid;
    } else {
      currLow = mid + 1;
    }
  }

  return currLow;
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {(function (root, stringify) {
  /* istanbul ignore else */
  if (true) {
    // Node.
    module.exports = stringify();
  } else if (typeof define === 'function' && define.amd) {
    // AMD, registers as an anonymous module.
    define(function () {
      return stringify();
    });
  } else {
    // Browser global.
    root.javascriptStringify = stringify();
  }
})(this, function () {
  /**
   * Match all characters that need to be escaped in a string. Modified from
   * source to match single quotes instead of double.
   *
   * Source: https://github.com/douglascrockford/JSON-js/blob/master/json2.js
   */
  var ESCAPABLE = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

  /**
   * Map of characters to escape characters.
   */
  var META_CHARS = {
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    "'":  "\\'",
    '"':  '\\"',
    '\\': '\\\\'
  };

  /**
   * Escape any character into its literal JavaScript string.
   *
   * @param  {string} char
   * @return {string}
   */
  function escapeChar (char) {
    var meta = META_CHARS[char];

    return meta || '\\u' + ('0000' + char.charCodeAt(0).toString(16)).slice(-4);
  };

  /**
   * JavaScript reserved word list.
   */
  var RESERVED_WORDS = {};

  /**
   * Map reserved words to the object.
   */
  (
    'break else new var case finally return void catch for switch while ' +
    'continue function this with default if throw delete in try ' +
    'do instanceof typeof abstract enum int short boolean export ' +
    'interface static byte extends long super char final native synchronized ' +
    'class float package throws const goto private transient debugger ' +
    'implements protected volatile double import public let yield'
  ).split(' ').map(function (key) {
    RESERVED_WORDS[key] = true;
  });

  /**
   * Test for valid JavaScript identifier.
   */
  var IS_VALID_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

  /**
   * Check if a variable name is valid.
   *
   * @param  {string}  name
   * @return {boolean}
   */
  function isValidVariableName (name) {
    return !RESERVED_WORDS[name] && IS_VALID_IDENTIFIER.test(name);
  }

  /**
   * Return the global variable name.
   *
   * @return {string}
   */
  function toGlobalVariable (value) {
    return 'Function(' + stringify('return this;') + ')()';
  }

  /**
   * Serialize the path to a string.
   *
   * @param  {Array}  path
   * @return {string}
   */
  function toPath (path) {
    var result = '';

    for (var i = 0; i < path.length; i++) {
      if (isValidVariableName(path[i])) {
        result += '.' + path[i];
      } else {
        result += '[' + stringify(path[i]) + ']';
      }
    }

    return result;
  }

  /**
   * Stringify an array of values.
   *
   * @param  {Array}    array
   * @param  {string}   indent
   * @param  {Function} next
   * @return {string}
   */
  function stringifyArray (array, indent, next) {
    // Map array values to their stringified values with correct indentation.
    var values = array.map(function (value, index) {
      var str = next(value, index);

      if (str === undefined) {
        return String(str);
      }

      return indent + str.split('\n').join('\n' + indent);
    }).join(indent ? ',\n' : ',');

    // Wrap the array in newlines if we have indentation set.
    if (indent && values) {
      return '[\n' + values + '\n]';
    }

    return '[' + values + ']';
  }

  /**
   * Stringify a map of values.
   *
   * @param  {Object}   object
   * @param  {string}   indent
   * @param  {Function} next
   * @return {string}
   */
  function stringifyObject (object, indent, next) {
    // Iterate over object keys and concat string together.
    var values = Object.keys(object).reduce(function (values, key) {
      var value = next(object[key], key);

      // Omit `undefined` object values.
      if (value === undefined) {
        return values;
      }

      // String format the key and value data.
      key   = isValidVariableName(key) ? key : stringify(key);
      value = String(value).split('\n').join('\n' + indent);

      // Push the current object key and value into the values array.
      values.push(indent + key + ':' + (indent ? ' ' : '') + value);

      return values;
    }, []).join(indent ? ',\n' : ',');

    // Wrap the object in newlines if we have indentation set.
    if (indent && values) {
      return '{\n' + values + '\n}';
    }

    return '{' + values + '}';
  }

  /**
   * Convert JavaScript objects into strings.
   */
  var OBJECT_TYPES = {
    '[object Array]': stringifyArray,
    '[object Object]': stringifyObject,
    '[object Error]': function (error) {
      return 'new Error(' + stringify(error.message) + ')';
    },
    '[object Date]': function (date) {
      return 'new Date(' + date.getTime() + ')';
    },
    '[object String]': function (string) {
      return 'new String(' + stringify(string.toString()) + ')';
    },
    '[object Number]': function (number) {
      return 'new Number(' + number + ')';
    },
    '[object Boolean]': function (boolean) {
      return 'new Boolean(' + boolean + ')';
    },
    '[object Uint8Array]': function (array, indent) {
      return 'new Uint8Array(' + stringifyArray(array) + ')';
    },
    '[object Set]': function (array, indent, next) {
      if (typeof Array.from === 'function') {
        return 'new Set(' + stringify(Array.from(array), indent, next) + ')';
      } else return undefined;
    },
    '[object Map]': function (array, indent, next) {
      if (typeof Array.from === 'function') {
        return 'new Map(' + stringify(Array.from(array), indent, next) + ')';
      } else return undefined;
    },
    '[object RegExp]': String,
    '[object Function]': String,
    '[object global]': toGlobalVariable,
    '[object Window]': toGlobalVariable
  };

  /**
   * Convert JavaScript primitives into strings.
   */
  var PRIMITIVE_TYPES = {
    'string': function (string) {
      return "'" + string.replace(ESCAPABLE, escapeChar) + "'";
    },
    'number': String,
    'object': String,
    'boolean': String,
    'symbol': String,
    'undefined': String
  };

  /**
   * Convert any value to a string.
   *
   * @param  {*}        value
   * @param  {string}   indent
   * @param  {Function} next
   * @return {string}
   */
  function stringify (value, indent, next) {
    // Convert primitives into strings.
    if (Object(value) !== value) {
      return PRIMITIVE_TYPES[typeof value](value, indent, next);
    }

    // Handle buffer objects before recursing (node < 6 was an object, node >= 6 is a `Uint8Array`).
    if (typeof Buffer === 'function' && Buffer.isBuffer(value)) {
      return 'new Buffer(' + next(value.toString()) + ')';
    }

    // Use the internal object string to select stringification method.
    var toString = OBJECT_TYPES[Object.prototype.toString.call(value)];

    // Convert objects into strings.
    return toString ? toString(value, indent, next) : undefined;
  }

  /**
   * Stringify an object into the literal string.
   *
   * @param  {*}               value
   * @param  {Function}        [replacer]
   * @param  {(number|string)} [space]
   * @param  {Object}          [options]
   * @return {string}
   */
  return function (value, replacer, space, options) {
    options = options || {}

    // Convert the spaces into a string.
    if (typeof space !== 'string') {
      space = new Array(Math.max(0, space|0) + 1).join(' ');
    }

    var maxDepth = Number(options.maxDepth) || 100;
    var references = !!options.references;
    var skipUndefinedProperties = !!options.skipUndefinedProperties;
    var valueCount = Number(options.maxValues) || 100000;

    var path = [];
    var stack = [];
    var encountered = [];
    var paths = [];
    var restore = [];

    /**
     * Stringify the next value in the stack.
     *
     * @param  {*}      value
     * @param  {string} key
     * @return {string}
     */
    function next (value, key) {
      if (skipUndefinedProperties && value === undefined) {
        return undefined;
      }

      path.push(key);
      var result = recurse(value, stringify);
      path.pop();
      return result;
    }

    /**
     * Handle recursion by checking if we've visited this node every iteration.
     *
     * @param  {*}        value
     * @param  {Function} stringify
     * @return {string}
     */
    var recurse = references ?
      function (value, stringify) {
        if (value && (typeof value === 'object' || typeof value === 'function')) {
          var seen = encountered.indexOf(value);

          // Track nodes to restore later.
          if (seen > -1) {
            restore.push(path.slice(), paths[seen]);
            return;
          }

          // Track encountered nodes.
          encountered.push(value);
          paths.push(path.slice());
        }

        // Stop when we hit the max depth.
        if (path.length > maxDepth || valueCount-- <= 0) {
          return;
        }

        // Stringify the value and fallback to
        return stringify(value, space, next);
      } :
      function (value, stringify) {
        var seen = stack.indexOf(value);

        if (seen > -1 || path.length > maxDepth || valueCount-- <= 0) {
          return;
        }

        stack.push(value);
        var value = stringify(value, space, next);
        stack.pop();
        return value;
      };

    // If the user defined a replacer function, make the recursion function
    // a double step process - `recurse -> replacer -> stringify`.
    if (typeof replacer === 'function') {
      var before = recurse

      // Intertwine the replacer function with the regular recursion.
      recurse = function (value, stringify) {
        return before(value, function (value, space, next) {
          return replacer(value, space, function (value) {
            return stringify(value, space, next);
          });
        });
      };
    }

    var result = recurse(value, stringify);

    // Attempt to restore circular references.
    if (restore.length) {
      var sep = space ? '\n' : '';
      var assignment = space ? ' = ' : '=';
      var eol = ';' + sep;
      var before = space ? '(function () {' : '(function(){'
      var after = '}())'
      var results = ['var x' + assignment + result];

      for (var i = 0; i < restore.length; i += 2) {
        results.push('x' + toPath(restore[i]) + assignment + 'x' + toPath(restore[i + 1]));
      }

      results.push('return x');

      return before + sep + results.join(eol) + eol + after
    }

    return result;
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).Buffer))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(10)
var ieee754 = __webpack_require__(11)
var isArray = __webpack_require__(12)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Map v in range [a, b] to range [c, d]
 * @param {Number} v
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @param {Number} d
 */
var mapRange = function mapRange(v, a, b, c, d) {
  return (v - a) / (b - a) * (d - c) + c;
};

/**
 * Map the output sin(v / div) to the range [a, b]
 * @param {Number} v
 * @param {Number} div
 * @param {Number} a
 * @param {Number} b
 */
var sinMap = function sinMap(v, div, a, b) {
  return mapRange(Math.sin(v / div), -1, 1, a, b);
};

/**
 * Map the output cos(v / div) to the range [a, b]
 * @param {Number} v
 * @param {Number} div
 * @param {Number} a
 * @param {Number} b
 */
var cosMap = function cosMap(v, div, a, b) {
  return mapRange(Math.cos(v / div), -1, 1, a, b);
};

/**
 * if v is greater than M or less than m, wrap the value around to stay in this range
 * @param {Number} v
 * @param {Number} m
 * @param {Number} M
 */
var wrapValue = function wrapValue(v, m, M) {
  return m + v % M;
};

/**
 * Return a deep copy array a
 * @param {Array<any>} a
 */
var deepArrayCopy = function deepArrayCopy(a) {
  return a.map(function (ae) {
    return Array.isArray(ae) ? deepArrayCopy(ae) : ae;
  });
};

/**
 * Create an array of size s
 * @param {Number} s
 */
var genArray = function genArray(s) {
  return Array.apply(null, { length: s });
};

/**
 * Get the Y component of a 1d array containing 2d data when the index is i
 * @param {Number} i
 * @param {Number} cols
 */
var get1dY = function get1dY(i, cols) {
  return i / cols | 0;
};

/**
 * Get the X component of a 1d array containing 2d data when the index is i
 * @param {Number} i
 * @param {Number} cols
 */
var get1dX = function get1dX(i, cols) {
  return i % cols;
};

/**
 * Get the index to a 1d Array from coordinates where the number of columns is cols
 * @param {*} x
 * @param {*} y
 * @param {*} cols
 */
var get1dIndex = function get1dIndex(x, y, cols) {
  return y * cols + x;
};

/**
 * Copy of an array without a given element
 * @param {*} arr
 * @param {*} item
 */
var without = function without(arr, item) {
  var itemIndex = arr.indexOf(item);
  var arr2 = [].concat(_toConsumableArray(arr));
  arr2.splice(itemIndex, 1);
  return arr2;
};

/**
 * pick a random element from the array a
 * @param {Array<any>} a
 */
var choose = function choose(a) {
  return a[Math.random() * a.length | 0];
};

/**
 * Pick a random element from an array without a given item
 * @param {*} arr
 * @param {*} item
 */
var chooseWithout = function chooseWithout(arr, item) {
  return choose(without(arr, item));
};

/**
 * Random number in range [a, b]
 * @param {Number} a
 * @param {Number} b
 */
var rndB = function rndB() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return Math.random() * (b - a + 1) + a;
};

/**
 * Random integer in range [a, b]
 * @param {Number} a
 * @param {Number} b
 */
var rndIntB = function rndIntB() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return rndB(a, b) + 0.5 >> 0;
};

/* start exports */
exports.mapRange = mapRange;
exports.sinMap = sinMap;
exports.cosMap = cosMap;
exports.wrapValue = wrapValue;
exports.deepArrayCopy = deepArrayCopy;
exports.genArray = genArray;
exports.get1dY = get1dY;
exports.get1dX = get1dX;
exports.get1dIndex = get1dIndex;
exports.without = without;
exports.choose = choose;
exports.chooseWithout = chooseWithout;
exports.rndB = rndB;
exports.rndIntB = rndIntB;
/* end exports */

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _combined = _interopRequireDefault(__webpack_require__(15));

var _jesus = _interopRequireDefault(__webpack_require__(16));

var _hitler = _interopRequireDefault(__webpack_require__(17));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  trump: _combined.default,
  jesus: _jesus.default,
  hitler: _hitler.default
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "I'd like to take a moment to talk about the heartbreak and devastation in Louisiana, a state that is very special to me.\nWe are one nation. When one state hurts, we all hurt – and we must all work together to lift each other up. Working, building, restoring together.\nOur prayers are with the families who have lost loved ones, and we send them our deepest condolences. Though words cannot express the sadness one feels at times like this, I hope everyone in Louisiana knows that our country is praying for them and standing with them to help them in these difficult hours.\nWe are one country, one people, and we will have together one great future.\nTonight, I'd like to talk about the New American Future we are going to create together.\nLast week, I laid out my plan to bring jobs back to our country.\nOn Monday, I laid out my plan to defeat Radical Islamic Terrorism.\nOn Tuesday, in Wisconsin, I talked about how we are going to restore law and order to this country.\nLet me take this opportunity to extend our thanks and our gratitude to the police and law enforcement officers in this country who have sacrificed so greatly in these difficult times.\nThe chaos and violence on our streets, and the assaults on law enforcement, are an attack against all peaceful citizens. If I am elected President, this chaos and violence will end – and it will end very quickly.\nEvery single citizen in our land has a right to live in safety.\nTo be one united nation, we must protect all of our people. But we must also provide opportunities for all of our people.\nWe cannot make America great again if we leave any community behind.\nNearly Four in ten African-American children are living in poverty.I will not rest until children of every color in this country are fully included in the American Dream.\nJobs, safety, opportunity. Fair and equal representation. This is what I promise to African-Americans, Hispanic-Americans, and all Americans.\nBut to achieve this New American Future we must break from the failures of the past.\nAs you know, I am not a politician. I have worked in business, creating jobs and rebuilding neighborhoods my entire adult life. I've never wanted to learn the language of the insiders, and I've never been politically correct – it takes far too much time, and can often make more difficult.\nSometimes, in the heat of debate and speaking on a multitude of issues, you don't choose the right words or you say the wrong thing. I have done that, and I regret it, particularly where it may have caused personal pain. Too much is at stake for us to be consumed with these issues.\nBut one thing I can promise you is this: I will always tell you the truth.\nI speak the truth for all of you, and for everyone in this country who doesn't have a voice.\nI speak the truth on behalf of the factory worker who lost his or her job.\nI speak the truth on behalf of the Veteran who has been denied the medical care they need – and so many are not making it. They are dying.\nI speak the truth on behalf of the family living near the border that deserves to be safe in their own country but is instead living with no security at all.\nOur campaign is about representing the great majority of Americans – Republicans, Democrats, Independents, Conservatives and Liberals – who read the newspaper, or turn on the TV, and don't hear anyone speaking for them. All they hear are insiders fighting for insiders.\nThese are the forgotten men and women in our society, and they are angry at so much on so many levels. The poverty, the unemployment, the failing schools, the jobs moving to other countries.\nI am fighting for these forgotten Americans.\nFourteen months ago, I declared my campaign for the Presidency on the promise to give our government back to the people. Every day since then, I've worked to repay the loyalty and the faith that you have put in me.\nEvery day I think about how much is at stake for this country. This isn't just the fight of my life, it's the fight ofour lives – together – to save our country.\nI refuse to let another generation of American children be excluded from the American Dream. Our whole country loses when young people of limitless potential are denied the opportunity to contribute their talents because we failed to provide them the opportunities they deserved. Let our children be dreamers too.\nOur whole country loses every time a kid doesn't graduate from high school, or fails to enter the workforce or, worse still, is lost to the dreadful world of drugs and crime.\nWhen I look at the failing schools, the terrible trade deals, and the infrastructure crumbling in our inner cities, I know all of this can be fixed - and it can be fixed very quickly.\nIn the world I come from, if something is broken, you fix it.\nIf something isn't working, you replace it.\nIf a product doesn't deliver, you make a change.\nI have no patience for injustice, no tolerance for government incompetence, no sympathy for leaders who fail their citizens.\nThat's why I am running: to end the decades of bitter failure and to offer the American people a new future of honesty, justice and opportunity. A future where America, and its people, always – and I mean always – come first.\nAren't you tired of a system that gets rich at your expense?\nAren't you tired of the same old lies and the same old broken promises? And Hillary Clinton has proven to be one of the greatest liars of all time.\nAren't you tired of arrogant leaders who look down on you, instead of serving and protecting you?\nThat is all about to change – and it's about to change soon. We are going to put the American people first again.\nI've travelled all across this country laying out my bold and modern agenda for change.\nIn this journey, I will never lie to you. I will never tell you something I do not believe. I will never put anyone's interests ahead of yours.\nAnd, I will never, ever stop fighting for you.\nI have no special interest. I am spending millions of dollars on my own campaign – nobody else is.\nMy only interest is the American people.\nSo while sometimes I can be too honest, Hillary Clinton is the exact opposite: she never tells the truth. One lie after another, and getting worse each passing day.\nThe American people are still waiting for Hillary Clinton to apologize for all of the many lies she's told to them, and the many times she's betrayed them.\nTell me, has Hillary Clinton ever apologized for lying about her illegal email server and deleting 33,000 emails?\nHas Hillary Clinton apologized for turning the State Department into a pay-for-play operation where favors are sold to the highest bidder?\nHas she apologized for lying to the families who lost loved ones at Benghazi?\nHas she apologized for putting Iran on the path to nuclear weapons?\nHas she apologized for Iraq? For Libya? For Syria? Has she apologized for unleashing ISIS across the world?\nHas Hillary Clinton apologized for the decisions she made that have led to so much death, destruction and terrorism?\nSpeaking of lies, we now know from the State Department announcement that President Obama lied about the $400 million dollars in cash that was flown to Iran. He denied it was for the hostages, but it was. He said we don't pay ransom, but he did. He lied about the hostages – openly and blatantly – just like he lied about Obamacare.\nNow the Administration has put every American travelling overseas, including our military personnel, at greater risk of being kidnapped. Hillary Clinton owns President Obama's Iran policy, one more reason she can never be allowed to be President.\nLet's talk about the economy. Here, in this beautiful state, so many people have suffered because of NAFTA. Bill Clinton signed the deal, and Hillary Clinton supported it. North Carolina has lost nearly half of its manufacturing jobs since NAFTA went into effect.\nBill Clinton also put China into the World Trade Organization – another Hillary Clinton-backed deal. Your city of Charlotte has lost 1 in 4 manufacturing jobs since China joined the WTO, and many of these jobs were lost while Hillary Clinton was Secretary of State – our chief diplomat with China. She was a disaster, totally unfit for the job.\nHillary Clinton owes the State of North Carolina a very big apology, and I think you'll get that apology around the same time you'll get to see her 33,000 deleted emails.\nAnother major issue in this campaign has been the border. Our open border has allowed drugs and crime and gangs to pour into our communities. So much needless suffering, so much preventable death. I've spent time with the families of wonderful Americans whose loved ones were killed by the open borders and Sanctuary Cities that Hillary Clinton supports.\nI've embraced the crying parents who've lost their children to violence spilling across our border. Parents like Laura Wilkerson and Michelle Root and Sabine Durden and Jamiel Shaw whose children were killed by illegal immigrants.\nMy opponent supports Sanctuary Cities.\nBut where was the Sanctuary for Kate Steinle? Where was the Sanctuary for the children of Laura, Michelle, Sabine and Jamiel?\nWhere was the Sanctuary for every other parent who has suffered so horribly?\nThese moms and dads don't get a lot of consideration from our politicians. They certainly don't get apologies. They'll never even get the time of day from Hillary Clinton.\nBut they will always come first to me.\nListen closely: we will deliver justice for all of these American Families. We will create a system of immigration that makes us all proud.\nHillary Clinton's mistakes destroy innocent lives, sacrifice national security, and betray the working families of this country.\nPlease remember this: I will never put personal profit before national security. I will never leave our border open to appease donors and special interests. I will never support a trade deal that kills American jobs. I will never put the special interests before the national interest. I will never put a donor before a voter, or a lobbyist before a citizen.\nInstead, I will be a champion for the people.\nThe establishment media doesn't cover what really matters in this country, or what's really going on in people's lives. They will take words of mine out of context and spend a week obsessing over every single syllable, and then pretend to discover some hidden meaning in what I said.\nJust imagine for a second if the media spent this energy holding the politicians accountable who got innocent Americans like Kate Steinle killed – she was gunned down by an illegal immigrant who had been deported five times.\nJust imagine if the media spent this much time investigating the poverty and joblessness in our inner cities.\nJust think about how much different things would be if the media in this country sent their cameras to our border, or to our closing factories, or to our failing schools. Or if the media focused on what dark secrets must be hidden in the 33,000 emails Hillary Clinton deleted.\nInstead, every story is told from the perspective of the insiders. It's the narrative of the people who rigged the system, never the voice of the people it's been rigged against.\nSo many people suffering in silence. No cameras, no coverage, no outrage from a media class that seems to get outraged over just about everything else.\nSo again, it's not about me. It's never been about me. It's about all the people in this country who don't have a voice.\nI am running to be their voice.\nI am running to be the voice for every forgotten part of this country that has been waiting and hoping for a better future.\nI am glad that I make the powerful a little uncomfortable now and again – including some powerful people in my own party. Because it means I am fighting for real change.\nThere's a reason the hedge fund managers, the financial lobbyists, the Wall Street investors, are throwing their money at Hillary Clinton. Because they know she will make sure the system stays rigged in their favor.\nIt's the powerful protecting the powerful.\nThe insiders fighting for the insiders.\nI am fighting for you.\nHere is the change I propose.\nOn terrorism, we are going to end the era of nation-building and instead focus on destroying ISIS and Radical Islamic terrorism.\nWe will use military, cyber and financial warfare and work with any partner in the world, and the Middle East, that shares our goal of defeating terrorism. I have a message for the terrorists trying to kill our citizens: we will find you, we will destroy you, and we will win.\nOn immigration, we will temporarily suspend immigration from any place where adequate screening cannot be performed. All applicants for immigration will be vetted for ties to radical ideology, and we will screen out anyone who doesn't share our values and love our people. Anyone who believes Sharia law supplants American law will not be given an immigrant visa. If you want to join our society, then you must embrace our society, our values and our tolerant way of life. Those who believe in oppressing women, gays, Hispanics, African-Americans and people of different faiths are not welcome to join our country.\nWe will promote our America values, our American way of life, and our American system of government which are all the best in the world.\nMy opponent on the other hand wants a 550% increase in Syrian refugees. Her plan would bring in roughly 620,000 refugees from all refugee-sending nations in her first term, on top of all other immigration. Hillary Clinton is running to be America's Angela Merkel, and we've seen how much crime and how many problems that's caused the German people.\nWe have enough problems already, we don't need another one.\nOn crime, we are going to add more police, more investigators, and appoint the best judges and prosecutors in the world. We will pursue strong enforcement of federal laws.\nThe gangs and cartels and criminal syndicates terrorizing our people will be stripped apart one by one. Their day is over.\nOn trade, we are going to renegotiate NAFTA, withdraw from the TPP, stand up to China on our terrible trade agreement, and protect every last American job.\nHillary Clinton has supported all of the major trade deals that have stripped this country of its jobs and its wealth.\nOn taxes, we are going to massively cut tax rates for workers and small businesses – creating millions of new good paying jobs.\nWe are going to get rid of regulations that send jobs overseas and we are going to make it easier for young Americans to get the credit they need to start a small business and pursue their dreams.\nOn education, we are going to give students choice, and allow charter schools to thrive. We are going to end tenure policies that reward bad teachers and hurt good ones. My opponent wants to deny students choice and opportunity, all to get a little bit more money from the education bureaucracy. She doesn't care how many young dreams are dashed in the process.\nWe are going to work closely with African-American parents and students in the inner cities – and what a big difference that will make. This means a lot to me, and it is going to be a top priority in a Trump Administration.\nOn healthcare, we are going to repeal and replace Obamacare. Countless Americans have been forced into part-time jobs, premiums are about to jump by double-digits yet again, and just this week Aetna announced it is pulling out of the exchanges in North Carolina. We are going to replace this disaster with reforms that give you choice and freedom and control in healthcare – at a much lower cost.\nOn political corruption, we are going to restore honor to our government.\nIn my Administration, I am going to enforce all laws concerning the protection of classified information. No one will be above the law.\nI am going to forbid senior officials from trading favors for cash by preventing them from collecting lavish speaking fees through their spouses when they serve.\nI am going to ask my senior officials to sign an agreement not to accept speaking fees from corporations with a registered lobbyist for five years after leaving office, or from any entity tied to a foreign government.\nFinally, we are going to bring this country together. We are going to do it by emphasizing what we all have in common as Americans. We are going to reject the bigotry of Hillary Clinton, which sees communities of color only as votes and not as human beings worthy of a better future.\nIf African-American voters give Donald Trump a chance by giving me their vote, the result for them will be amazing. Look at how badly things are going under decades of Democratic leadership – look at the schools, look at the 58% of young African-Americans not working. It is time for change.\nWhat do you have to lose by trying something new? – I will fix it. This means so much to me, and I will work as hard as I can to bring new opportunity to places in our country which have not known opportunity in a very long time.\nHillary Clinton and the Democratic Party have taken African-American votes totally for granted. Because the votes have been automatically there, there has been no reason for Democrats to produce.\nIt is time to break with the failures of the past, and to fight for every last American child in this country to have the better future they deserve.\nIn my Administration, every American will be treated equally, protected equally, and honored equally. We will reject bigotry and hatred and oppression in all of its forms, and seek a new future built on our common culture and values as one American people.\nThis is the change I am promising all of you: an honest government, a fair economy, and a just society for each and every American.\nBut we can never fix our problems by relying on the same politicians who created these problems in the first place.\n72% of voters say our country is on the wrong track. I am the change candidate, Hillary Clinton is the failed status quo.\nIt is time to vote for a New American Future.\nTogether, We will make America strong again.\nWe will make American proud again.\nWe will make America safe again.\nFriends and fellow citizens: Come November, we will make America great again.\nThank You, and God Bless.\nIt is a privilege to be here this morning with so many distinguished members of our armed services.\nBefore we get started with our Q & A, I'd like to address one of the most important aspects of America's national security, and that's Cyber Security.\nTo truly make America safe, we must make cybersecurity a major priority for both the government and the private sector.\nCyber theft is the fastest growing crime in the United States.\nAs President, improving cyber security will be an immediate and top priority for my Administration.\nOne of the very first things I will do is to order a thorough review of our cyber defenses and weaknesses, including all vital infrastructure.\nCyber-attacks from foreign governments, especially China, Russia, and North Korea along with non-state terrorist actors and organized criminal groups, constitute one of our most critical national security concerns.\nHillary Clinton's only experience in cyber security involves her criminal scheme to violate federal law, engineering a massive cover-up, and putting the entire nation in harm's way. The fact that a former Senator and Secretary of State claimed not to know what the letter \"C\" means is just one more example of why she's unfit to hold public office.\nThe scope of our cyber security problem is enormous. Our government, our businesses, our trade secrets, and our citizens' most sensitive information are all facing constant cyber attacks.\nJust consider some of these recent hacks:\nJP Morgan Chase had 73 million emails stolen.\nE-Bay was invaded and gave up 150 million passwords.\nTarget was attacked and gave up 40 million credit card numbers.\nAttacks like these are happening on a regular basis both in the United States and around the world, and the costs in our privacy, our security and on our financial sector are extraordinary.\nIdentify theft, financial laundering, as well as ransom ware – involving the extortion of a hacked institution – are all becoming increasingly common.\nIncredibly, hackers were able to obtain at least 20 million identities of people who underwent FBI background investigations.\nThe information hacked contains facts discovered by the FBI in doing background checks for people seeking positions with the Federal Government. It is a treasure trove which can be easily used for blackmail.\nThe fact that this highly classified information was so poorly protected demonstrates that cyber security is just one more area where the Obama Administration has failed.\nWe should not let this be like the history of the Mafia which was allowed to grow into a nation-wide organization which infiltrated and corrupted so many areas of society for such a long time.\nWe can learn from this history that when the Department of Justice, the FBI, the DEA and state and local police and prosecutors were combined in Task Forces directed at the Mafia, they were able to have great success in prosecuting them, seizing their business interests and removing their infiltration from legitimate areas of society.\nAs President, I will instruct the Department of Justice to create Joint Task Forces throughout the United States to work together with Federal, State, and local law enforcement authorities and international law enforcement to crush this still-developing area of crime.\nI will make certain that our military is the best in the world in both cyber offense and defense. I will also ask my Secretary of Defense and Joint Chiefs to present recommendations for strengthening and augmenting our Cyber Command.\nAs a deterrent against attacks on our critical resources, the United States must possess the unquestioned capacity to launch crippling cyber counter-attacks. This is the warfare of the future, America's dominance in this arena must be unquestioned.\nCyber security is not only a question of developing defensive technologies but offensive technologies as well.\nFor non-state terror actors, the United States must develop the ability – no matter how difficult – to track down and incapacitate those responsible. We should turn cyber warfare into one of our greatest weapons against the terrorists.\nTo enhance the defense of the other agencies of government, including our law enforcement agencies, we will put together a team of the best military, civilian and private sector cyber security experts to comprehensively review all of our cyber security systems and technology.\nThe Cyber Review Team will proceed with the most sensitive systems first, but ultimately all systems will be analyzed and made as secure as modern technology permits.\nI will also require that follow-up reviews take place on a regular basis determined by the sensitive nature of the security involved.\nThe review will include providing exact recommendations for the best combination of defensive technologies tailored to specific agencies.\nThis will include the various methods of internal monitoring, attack and penetration, investigation of suspected hackers or rogue employees, and identity protection for government employees.\nThe review team will also remain current on the constantly-evolving new methods of attack, and will attempt to anticipate them and develop defenses as often as possible before major breaches occur.\nThis group of experts will set up protocols for each agency and government officials, requiring them to follow best practices.\nThey will also establish a training program for all government employees to make certain they understand what defenses are available and utilize them, along with a continuing education program so everyone is aware of the newest methods of both attack and defense.\nThose who violate classification rules will be held responsible to the fullest extent of the law. I will appoint an Attorney General who will reform the Department of Justice like it was necessary after Watergate. My Attorney General will restore the integrity of the Department of Justice.\nToday is just the beginning of a long and overdue national discussion of how to protect ourselves from modern cyber-crime and evolving national security threats, and how to develop the cyber offense strategies necessary to gain a critical security edge in the 21st century.\nThank you. I want to applaud my daughter, Ivanka, for her work and leadership on the issues facing working moms in our country. She has been deeply invested in this since long before the campaign began, and I am so grateful for her work and efforts on this proposal which I will be outlining today.\nI want to also take a moment to recognize Congresswoman Cathy McMorris Rodgers, Chairwoman of the House Republican Conference and a mother of three small children, who has been such a leader on these issues.\nWe are also joined tonight by some amazing members of Congress in our audience: Congresswoman Blackburn, Lummis, Black, and Ellmers.\nOur campaign is about ideas. We're about solutions. I've travelled all over the country in recent weeks offering detailed plans to make life better for you and your family.\nI've outlined detailed proposals for providing school choice, reforming our tax and regulatory code, lifting restrictions on American energy, rebuilding our military, changing our foreign policy, fixing our immigration policy, and keeping our country safe.\nRight now, our politicians have locked our country into endless fights about small and petty things. I'm asking the nation to lift our sights, and to imagine what we can accomplish if we work together, trust each other, and put the needs of our own citizens first.\nWe must break our ties with the failed and bitter politics of the past and pursue a future where every American is honored and respected.\nWe have to reject the arrogance of Washington D.C. that looks down on everyday hardworking people. Too often those who have power have disdain for the views, beliefs and attitudes of those who don't have political power.\nThose in leadership must put themselves in the shoes of the laid-off factory worker, the family worried about security, or the mom struggling to afford childcare.\nThat means we need working mothers to be fairly compensated for their work, and to have access to affordable, quality child care for their kids.\nWe want higher pay, better wages, and a growing economy for everyone.\nThese solutions must update laws passed more than half a century ago when most women were still not in the labor force. Today, nearly 2 in 3 mothers with young children have jobs.\nFor many families in our country, childcare is now the single largest expense – even more than housing.\nYet, very little meaningful policy work has been done in this area – and my opponent has no childcare plan.\nMany Americans are just one crisis away from disaster – a sick kid, a lost job, a damaged home. There is no financial security.\nBut that will all change under our pro-family, pro-child, pro-worker plans I am outlining tonight. Before going any further, I want everyone watching on TV right now to go to DonaldJTrump.com to read the full plan.\nThe first part of my childcare plan allows every parent or family in America – including adoptive parents and foster parent guardians – to deduct their childcare expenses from their income taxes.\nThey will be able to fully deduct the average cost of child care for their state, from birth through the age of 13.\nBecause of the way the benefit is capped and structured, our plan will bring relief to working and middle class families.\nThe deduction also applies to elder care, capped at a $5,000-dollar deduction per year.\nImportantly, our policy also supports mothers who choose to stay at home, and honors and recognizes their incredible contributions\nto their families and to our society. Families with a stay-at-home parent will be able to fully deduct the average cost of child care from their taxes.\nFor low-income individuals who have no net income tax liability, we will offer an expanded Earned Income Tax Credit (EITC) in the form of a childcare rebate. Working parents can get an expanded EITC benefit that equals up to half of their total payroll tax – a major relief for low-income parents. This translates to as much as an extra $1,200 dollars in EITC benefits for working families.\nNext, our plan allows every parent in America to open up a Dependent Care Savings Account. Families can contribute up to $2,000 dollars a year to these accounts completely tax-free. Crucially, unlike the flexible spending accounts that exist today, these accounts will be available to all Americans – you won't have to depend on your employer to provide them.\nImmediate family and employers can also contribute to a dependent account, each of which is designated for a specific child, including an unborn child.\nThe money that is put into these accounts can also be spent not only on child care, but also child enrichment activities. Additionally, the funds in these accounts do not expire at the end of the year – they don't revert to employers or to the Treasury. Instead, the funds rollover – so while only $2,000 dollars can be contributed each year, unspent sums can accumulate and create substantial savings.\nThese savings can then be used by parents to help give their kids school choice, and will thus contribute to the school choice reforms\nI outlined last week.\nThe funds will remain in the account until the age of 18. Whatever still remains at that time can be used to help offset the costs of higher education.\nFor low-income individuals, the federal government will provide matching funds – if parents contribute $1,000 dollars, the federal government will provide a $500 dollars match. To help low-income families reach these targets and save money, we will put a box on federal income tax forms allowing these parents to have their Earned Income Tax Credit funds directly deposited into their Dependent Care Savings Accounts.\nThese Dependent Care Savings Accounts can also be set-up to provide care for elderly dependents.\nOur plan also includes much needed regulatory reform to incentivize private sector solutions. The new funds offered by our plan will create a new market for innovative childcare solutions.\nBut to make sure these solutions are available, especially in low-income and rural communities, we must reduce regulations that favor large institutional care facilities. We will allow the states to make the decisions that are right for them.\nIn this era of the sharing economy, we want parents to be able to access lower-cost, competitive and innovative solutions at the click of a button – including services like nanny-sharing. Our plan would also cover care provided by relatives and grandparents.\nOur plan includes incentives for more employers to offer on-site childcare as well. This can often be a good solution for many working parents, and can save them up to 30 minutes of commute time. Currently, only 7% of employers provide these services. Our plan will expand tax deductions for employers, allow companies to pool resources to provide shared childcare services, and remove needless requirements that have prevented employers from using the credit.\nFinally, our plan offers a crucial safety net for working mothers whose employers do not provide paid maternity leave. This solution will receive strong bipartisan support, and will be completely self-financing. By recapturing fraud and improper payments in the unemployment insurance program, we can provide 6 weeks of paid-maternity leave to any mother with a newborn child whose employer does not provide the benefit. This maternity leave will be paid straight out of the unemployment insurance fund and, again, this safety net will be completely paid-for through savings within the program.\nThere are more reforms and solutions in our childcare plan, and you can review them all on the website.\nOn Thursday, I will outline my full economic plan, which is completely paid for through economic growth and proposed federal budget savings. Together, our tax, trade, regulatory, and energy policies will add trillions in new deficit-lowering growth.\nThese are the kinds of solutions I want to bring to the White House as your President. It's time to free ourselves from the baskets that politicians try to put us in, and instead to work together – not as Republicans or Democrats – but as Americans, to achieve real, positive results for the American people.\nWhile my opponent slanders you as deplorable and irredeemable, I call you, hard-working American Patriots who love your country, love\nyour families, and want a better future for all Americans.\nIt's time to end the rule of special interests, and to begin the rule of the American people.\nIt's time to stop fighting over the smallest words, and to start dreaming about the great adventures that lie ahead.\nIt is time to Believe In America.\nTogether, We Will Make Our Country Strong Again.\nWe Will Make Our Country Prosperous Again.\nAnd Will Make Our Country Great Again For Everyone."

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "Do not let your hearts be troubled and do not be afraid.\nGive, and it will be given to you. Good measure, pressed down, shaken together, running over, will be put into your lap. For with the measure you use it will be measured back to you.\nI am the vine; you are the branches. Whoever abides in me and I in him, he it is that bears much fruit, for apart from me you can do nothing.\nThere is nothing outside a person that by going into him can defile him, but the things that come out of a person are what defile him.\nWhoever hears my word and believes him who sent me has eternal life.\nTherefore I tell you, do not be anxious about your life, what you will eat, nor about your body, what you will put on. For life is more than food, and the body more than clothing. Consider the ravens: they neither sow nor reap, they have neither storehouse nor barn, and yet God feeds them. Of how much more value are you than the birds!\nThe Sabbath was made for man, not man for the Sabbath. So the Son of Man is lord even of the Sabbath.\nSeek first his kingdom and his righteousness, and all these things will be given to you as well.\nLet the greatest among you become as the youngest, and the leader as one who serves.\nThose who are well have no need of a physician, but those who are sick. I came not to call the righteous, but sinners.\nWhoever does not take his cross and follow me is not worthy of me. Whoever finds his life will lose it, and whoever loses his life for my sake will find it.\nI am the way and the truth and the life.\nBehold, I have given you authority to tread on serpents and scorpions, and over all the power of the enemy, and nothing shall hurt you.\nThe kingdom of heaven is like treasure hidden in a field, which a man found and covered up. Then in his joy he goes and sells all that he has and buys that field.\nO righteous Father, even though the world does not know you, I know you, and these know that you have sent me. I made known to them your name\nDo not fear, only believe.\nLove the Lord your God with all your heart and with all your soul and with all your mind.\nJesus said to them again, Peace be with you. As the Father has sent me, even so I am sending you.\nMy home is in Heaven. I’m just traveling through this world.\nA new commandment I give unto you, That ye love one another; as I have loved you, that ye also love one another.\nBlessed are the poor in spirit: for theirs is the kingdom of heaven. Blessed are they that mourn: for they shall be comforted. Blessed are the meek: for they shall inherit the earth. Blessed are they which do hunger and thirst after righteousness: for they shall be filled. Blessed are the merciful: for they shall obtain mercy. Blessed are the pure in heart: for they shall see God. Blessed are the peacemakers: for they shall be called the children of God. Blessed are they which are persecuted for righteousness sake: for theirs is the kingdom of heaven. Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake. Rejoice, and be exceeding glad: for great is your reward in heaven; for so persecuted they the prophets which were before you.\nFor if ye forgive men their trespasses, your heavenly Father will also forgive you: But if ye forgive not men their trespasses, neither will your Father forgive your trespasses.\nBlessed are the merciful: for they shall obtain mercy.\nI am the way and the truth and the life. No one comes to the Father except through me.\nOur Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.\nMoreover when ye fast, be not, as the hypocrites, of a sad countenance: for they disfigure their faces, that they may appear unto men to fast. Verily I say unto you, They have their reward. But thou, when thou fastest, anoint thine head, and wash thy face; That thou appear not unto men to fast, but unto thy Father which is in secret: and thy Father, which seeth in secret, shall reward thee openly.\nIt is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God\nBlessed are the peacemakers: for they shall be called the children of God.\nAnd when thou prayest, thou shalt not be as the hypocrites are: for they love to pray standing in the synagogues and in the corners of the streets, that they may be seen of men. Verily I say unto you, They have their reward. But thou, when thou prayest, enter into thy closet, and when thou hast shut thy door, pray to thy Father which is in secret; and thy Father which seeth in secret shall reward thee openly. But when ye pray, use not vain repetitions, as the heathen do: for they think that they shall be heard for their much speaking. Be not ye therefore like unto them: for your Father knoweth what things ye have need of, before ye ask him. After this manner therefore pray ye: Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil.\nFollow me, and I will make you fishers of men.\nBlessed are they that mourn: for they shall be comforted.\nYe have heard that it hath been said, Thou shalt love thy neighbour, and hate thine enemy. But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you; That ye may be the children of your Father which is in heaven: for he maketh his sun to rise on the evil and on the good, and sendeth rain on the just and on the unjust. For if ye love them which love you, what reward have ye? do not even the publicans the same? And if ye salute your brethren only, what do ye more than others? do not even the publicans so? Be ye therefore perfect, even as your Father which is in heaven is perfect.\nBlessed are they which do hunger and thirst after righteousness: for they shall be filled.\nBlessed are the poor in spirit: for theirs is the kingdom of heaven.\nThink not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil. For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no wise pass from the law, till all be fulfilled. Whosoever therefore shall break one of these least commandments, and shall teach men so, he shall be called the least in the kingdom of heaven: but whosoever shall do and teach them, the same shall be called great in the kingdom of heaven. For I say unto you, That except your righteousness shall exceed the righteousness of the scribes and Pharisees, ye shall in no case enter into the kingdom of heaven.\nBlessed are they which are persecuted for righteousness sake: for theirs is the kingdom of heaven.\nBlessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake. Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you.\nBlessed are the pure in heart: for they shall see God.\nRepent: for the kingdom of heaven is at hand.\nYe are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men. Ye are the light of the world. A city that is set on an hill cannot be hid. Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house. Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.\nGet thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve.\nCome unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light.\nBlessed are the meek: for they shall inherit the earth.\nIt is written again, Thou shalt not tempt the Lord thy God.\nAgain, ye have heard that it hath been said by them of old time, Thou shalt not forswear thyself, but shalt perform unto the Lord thine oaths: But I say unto you, Swear not at all; neither by heaven; for it is God’s throne: Nor by the earth; for it is his footstool: neither by Jerusalem; for it is the city of the great King. Neither shalt thou swear by thy head, because thou canst not make one hair white or black. But let your communication be, Yea, yea; Nay, nay: for whatsoever is more than these cometh of evil.\nYe have heard that it was said by them of old time, Thou shalt not kill; and whosoever shall kill shall be in danger of the judgment: But I say unto you, That whosoever is angry with his brother without a cause shall be in danger of the judgment: and whosoever shall say to his brother, Raca, shall be in danger of the council: but whosoever shall say, Thou fool, shall be in danger of hell fire. Therefore if thou bring thy gift to the altar, and there rememberest that thy brother hath ought against thee; Leave there thy gift before the altar, and go thy way; first be reconciled to thy brother, and then come and offer thy gift. Agree with thine adversary quickly, whiles thou art in the way with him; lest at any time the adversary deliver thee to the judge, and the judge deliver thee to the officer, and thou be cast into prison. Verily I say unto thee, Thou shalt by no means come out thence, till thou hast paid the uttermost farthing.\nYe have heard that it hath been said, An eye for an eye, and a tooth for a tooth: But I say unto you, That ye resist not evil: but whosoever shall smite thee on thy right cheek, turn to him the other also. And if any man will sue thee at the law, and take away thy coat, let him have thy cloke also. And whosoever shall compel thee to go a mile, go with him twain. Give to him that asketh thee, and from him that would borrow of thee turn not thou away.\nYe are the light of the world. A city that is set on an hill cannot be hid. Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house. Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.\n that one of thy members should perish, and not that thy whole body should be cast into hell.Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men.\nTake heed that ye do not your alms before men, to be seen of them: otherwise ye have no reward of your Father which is in heaven. Therefore when thou doest thine alms, do not sound a trumpet before thee, as the hypocrites do in the synagogues and in the streets, that they may have glory of men. Verily I say unto you, They have their reward. But when thou doest alms, let not thy left hand know what thy right hand doeth: That thine alms may be in secret: and thy Father which seeth in secret himself shall reward thee openly.\nIt hath been said, Whosoever shall put away his wife, let him give her a writing of divorcement: But I say unto you, That whosoever shall put away his wife, saving for the cause of fornication, causeth her to commit adultery: and whosoever shall marry her that is divorced committeth adultery.\nYe have heard that it was said by them of old time, Thou shalt not commit adultery: But I say unto you, That whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart. And if thy right eye offend thee, pluck it out, and cast it from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell. And if thy right hand offend thee, cut if off, and cast it from thee: for it is profitable for thee\nDo not let your hearts be troubled. Trust in God; trust also in me.\nAnd know that I am with you always; yes, to the end of time.\nFor what shall it profit a man, if he gain the whole world, and suffer the loss of his soul?\nI am the Way, the Truth, and the Life. No one comes to the Father except through me.\nA new command I give you: Love one another. As I have loved you, so you must love one another.\nBlessed are the merciful, for they will be shown mercy.\nSo I say to you, Ask and it will be given to you; search, and you will find; knock, and the door will be opened for you.\nAs the Father has loved me, so have I loved you.\nLet the one among you who is without sin be the first to cast a stone.\nBut I say to you, Love your enemies and pray for those who persecute you, so that you may be sons of your Father who is in heaven; for he makes his sun rise on the evil and on the good, and sends rain on the just and on the unjust.\nDo not be anxious about tomorrow, for tomorrow will be anxious for itself. Let the day's own trouble be sufficient for the day.\nBlessed are the meek, for they will inherit the earth.\nAll my authority in heaven and on earth has been given to me.\nAll the commandments: You shall not commit adultery, you shall not kill, you shall not steal, you shall not covet, and so on, are summed up in this single command: You must love your neighbor as yourself.\nI tell you the truth, it is hard for a rich man to enter the kingdom of heaven. Again I tell you, it is easier for a camel to go through the eye of a needle than for a rich man to enter the kingdom of heaven.\nIf you bring forth what is within you, what you bring forth will save you. If you do not bring forth what is within you, what you do not bring forth will destroy you.\nIf you want to be perfect, go, sell your possessions and give to the poor, and you will have treasure in heaven.\nBehold, I stand at the door and knock. If anyone hears my voice and opens the door, I will come in to him and eat with him, and he with me.\nFor everyone who exalts himself will be humbled, and everyone who humbles himself will be exalted.\nFor God so loved the World that he gave his only Son, that whoever believes in him should not perish but have eternal life.\nAnd, behold, I come quickly; and my reward is with Me, to give every man according as his work shall be. I am Alpha and Omega, the beginning and the end, the first and the last.\nIf you love those who love you, what credit is that to you? For even sinners love those who love them. And if you do good to those who do good to you, what credit is that to you? For even sinners do the same.\nI am He who lives, and was dead, and behold, I am alive forevermore. Amen. And I have the keys of Hades and of Death.\nLittle children, you are from God, and have conquered them; for the one who is in you is greater than the one who is in this world.\nMan shall not live by bread alone, but by every word that proceeds from the mouth of God.\nMy kingdom is not of this world. If it were, my servants would fight to prevent my arrest by the Jews. But now my kingdom is from another place.\n"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "Seven years is a short time span, a fraction of a single person's life - barely a second in the life of a whole people. And yet the past seven years somehow seem longer than many decades of the past. A very important historical event is contained within them: the rebirth of a nation formerly threatened by extinction. It is an incredibly eventful time, and seems barely comprehensive sometimes to us, who have not just had the opportunity to witness but also to actually create a small part of it.\nDemocratic ideals are a big topic of discussion right now; not in Germany, but other parts of the world talk about them. We in Germany have learned our lesson with democratic ideals; if the rest of the world praises these ideals, we can only answer that the German people had the chance to live within the purest form of this ideal, and we ourselves are now reaping the legacy left by this democracy. We then get a lecture on the wonderful goals of war, especially from the British side. Great Britain has much experience in proclaiming goals of war, considering they have waged more wars than anyone else. The goals they proclaim today are fantastic: the creation of a new Europe. This Europe will be a just place, and the general equality will make arms unnecessary, so we can all disarm. This disarmament is supposed to kick start a period of economic blossoming, trade and movement should commence, especially trade, much trade, free trade! And from this trade, culture is supposed to bloom, and not just culture, but religion, too. In one phrase: the golden age is supposed to dawn. Unfortunately, this golden age has been described in a very similar fashion on several occasions, and not even by prior generations, but by the same people that are describing it yet again today. It's like a very worn-out groove on an old LP. We should pity these gentlemen, who haven't found a new, big idea to hook the people on, because they promised the same things in 1918: the goal of war then was also a \"new Europe\" and a \"new equality\", this new equality whose main element is abolishing a nation's right to self-determination. At that time, an equality that would make arms unnecessary in the future was promised. Thence issued the program of disarmament of everyone. And to make this disarmament especially manifest, it was supposed to be crowned by a union of all disarmed states, which had decided that, in the future, all differences (at least no one doubted there would still be differences) between them should be, well, as it is the custom among democracies, be talked to pieces in open discussions. Under no circumstances should there be any more shooting. And at that time it was already said that the consequences of this disarmament and this worldwide parliament would be an incredible blossoming, a blooming of industry and especially (and much emphasis is always put on this) of trade, of free trade. Culture, as well, should not be disregarded in this process, and while one spoke a little bit less about religion at the end of the war than at the beginning, we at least were told, in the year 1918, that it would be a blessed era that God would smile upon.\nWe are experiencing now what happened then: the old states were dissolved without even asking their peoples' opinion. Not in one single case was the nation asked if it agreed with the measures that others would put into place in them. Old, almost historical bodies were dissolved - not just states, but also economic bodies. One could not imagine something better in their stead, since what is created over a period of several centuries is probably better than anything else; it was definitely impossible for those people that view all of European history with the greatest arrogance to create something better. So it passed that, without taking into account a nation's  right to self-determination, Europe was hacked up, Europe was torn open, large states were dissolved, nations had their rights taken away. This was done by first making them helpless, then categorizing them in a manner that predetermined who the winners and the losers would be. There was no more talk of disarmament then, on the contrary, the arms race continued. For no one started solving their conflicts in a peaceful manner, on the contrary, those states with arms waged war just like before. Only the disarmed were not able to forbid the menacing actions of the armed, or even to keep them away from themselves. Paralleling this, of course, came not a period of economic health, but on the contrary an incredible system of reparations led to the economic downfall of not only the losers, but also of the winners themselves. No people felt the effects of this economic depression more than the Germans. The general economic disorganization led, particularly in Germany, to a widespread joblessness that almost ruined our German people. Culture, as well, was not enhanced, but rather ridiculed and warped. Religion took a back seat; in these 15 years no one British spoke of religion; no British person remembered Christian mercifulness or altruism. At that time the gentlemen did not take their Bibles with them on walks, instead, their Bible was the Treaty of Versailles! 448 paragraphs, all of which a burden, an obligation, a condemnation, a blackmail of Germany or towards Germany. And this Versailles was guaranteed by the new League of Nations - not a union of free nations, of similar nations, not a union of nations at all (the actual, founded nations stayed away) - a League of Nations whose sole task was to guarantee this most base of all agreements, this agreement which was not negotiated but instead purely forced upon us, and to force us to fulfill it.\nSo that was the time of a democratic Germany! Today, when foreign statesmen pretend not to be able to trust the modern Germany, it does not apply to the previous Germany: for was not that previous Germany birthed by and created by them, so they could trust it.\nAnd how badly they treated that Germany! Who still has complete memories of the history of that time: the horrible collapse of 1918, the tragic occurrences of 1919, and then all the years of domestic economic deterioration, the ongoing enslavement and impoverishment of our people, and most of all the complete hopelessness! Today, still, it is unsettling to think of that time, when a great nation slowly lost trust not just in itself, but in any sort of worldly justice. During this whole time, democratic Germany hoped, begged, and protested in vain. The international financial sector stayed brutally inconsiderate and squeezed as much as it could out of our people; the statesmen of the Allied nations remained hardhearted. It was mercilessly said, on the contrary, that 20 million Germans were too many. No one listened to the wretchedness of our unemployed, no one cared about the ruin of our agriculture or industry, not even of our trade. We remember this silencing of traffic that occurred at this time in the German Reich. At this time, when all hope was gone, when begging was proved to be futile, when protesting did not lead to victory: it was at this time that the National Socialist movement was created from one basic insight: the insight, that one is not allowed to hope in this world, nor beg, nor lower oneself by protesting. Instead, one needs to help oneself!\nFor 15 years, in this democratic Germany, hope was preached, hope for a new world, for new institutions. Every side had its international patron. Some hoped for the international solidarity of the proletariat, others placed their hope in democratic international institutions, on the League of Nations in Geneva. Still others hoped for a global conscience, for a cultural conscience, etc.\nAll this hope was in vain. We have put a different type of hope in the place of that previous hope: the hope of the only help that exists in this world, help through one's own power. The place that hope occupied is now filled with faith in our German people, in the mobilization of its eternal inner values. Back then , we had very little real tools to help us. What we saw as the building blocks of the new Reich, besides our own will, was firstly our people's manpower, secondly the intelligence of our people, and third that which our Lebensraum has to offer, namely, our earth and soil. Thus we began our work and subsequently witnessed this internal German ascent. This internal German ascent, which did not threaten the rest of the world in any way, which was purely internal German reforms, still instantaneously managed to produce hate in others. Possibly the most tragic moment of this happening was when we proclaimed our Four-Year-Plan, an idea which should have enthused the other world: a people wanted to help itself; it did not appeal to others for aid, it did not appeal for presents, for charity, it appealed to its own creative facilities, its own diligence, its own energy, its own intelligence. And still this other world started shouting, British statesmen cried out: what do you think you're doing, this Four-Year-Plan, it does not fit into our global economy! - as if they had let us have part in this global economy. No, they scented the recovery of the German people - and because of this, because we foresaw this and because we noticed this, we immediately began, parallel to this recovery, to remobilize German power.\nYou know these years. 1933, so the same year, in which we took over power, I saw myself forced to withdraw from the League of Nations and to leave the ridiculous conference on disarmament. We could not receive any rights from these two forums, despite years of begging and protesting.\n1934: German rearmament began on the grandest scale.\nIn 1935, I instituted the general draft.\nIn 1936 I corrected the situation of the Rhineland.\n1937 was the start of the Four-Year-Plan.\nIn 1938, the Ostmark and the Sudetenland were annexed to the Reich.\nIn 1939 we began to shield the Reich against those enemies that in the meantime had removed their masks. The measured introduced in 1939 were to protect the Reich.\nAll this could have been different, if this other world had, even for an hour, showed understanding for the German claims, for the necessities of life of the German people. So often it is said: we should have negotiated this. You remember, my comrades, did I not on more than one occasion raise the issue of German colonial claims before the world? Did we ever receive an answer to this, except for a no, except for repudiation, indeed almost new hostility? No, in Britain and France the ruling classes were determined to renew their fight against us the moment the Reich recovered. They wanted it so. For 300 years, Britain has followed its goal of preventing Europe to fully consolidate itself, just like France has for many centuries tried to prevent Germany from full consolidation.\nToday, when a Mr. Chamberlain stands forth as a preacher and announces to the rest of the world the pious goals of this war, I can only say: your own history speaks against you, Mr. Chamberlain. For 300 years your statesmen have always spoken thus, like you, Mr. Chamberlain, when war broke out. You have generally only fought for God or your religion. You have never had a material goal. But because the British never fought for material goals, God has rewarded you with so many material goods. God has not forgotten that Britain was always the warrior for truth, for justice, the champion of all virtues. They were richly rewarded for this. Over a period of 300 years, they have subjugated about 40 million km of earth; of course not because of egoism, not because they love to have power or gain riches or self-indulgence, no, quite on the contrary this all happened as part of God's mandate and in the name of religion. Indeed, Britain did not want to be the sole champion of God, so it always invited others to come join this noble fight. It did not even try to carry the main burden alone; if you are doing work mandated by God like this, allies can always be sought.\nThis is the same thing they do today. And it has, as just said, been richly rewarding for Britain. 40 million km, and British history is a ceaseless row of rapes, of extortions, of tyrannical abuse, of subjugation, of pillage. There are many things that would be unthinkable in any other state and in any other people. War was declared for everything. War was waged to increase trade. War was waged to get other peoples addicted to opium. War was also waged, when necessary, to win goldmines, to attain power over diamond mines. There were always material goals, although of course they were noble embellished with ideals. The last war was also waged solely for ideal goals. That the side effects included winning the German colonies was God-willed. That our fleet was taken, that our German foreign assets were cashed, those are just side effects of this noble struggle for the holy religion. When Mr. Chamberlain walks around with carrying his Bible and preaches his goals of war, it seems to me as if the devil with a prayer book is closing in on some poor soul. And this is not even original anymore! This is old, no one believes him anymore. I think, he mistrusts himself."

/***/ }),
/* 18 */
/***/ (function(module, exports) {

var $trumpContainer = document.querySelector('#trump-container');
var $generate = document.querySelector('#generate');
var $choices = document.querySelector('#choose-combo');
var $back = document.querySelector('#back');
var $question = document.querySelector('.question');
var $cross = document.querySelector('.cross');
var $howItWorks = document.querySelector('#how-it-works');
$question.addEventListener('click', function () {
  $howItWorks.className = '';
});
$cross.addEventListener('click', function () {
  $howItWorks.className = 'hide';
});
$back.addEventListener('click', function () {
  $choices.className = '';
  $generate.className = 'hide';
  $trumpContainer.className = 'hide';
  $back.className = 'hide';
});

var setTrumpText = function setTrumpText(text) {
  $trumpContainer.innerHTML = text;
};

module.exports = {
  setTrumpText: setTrumpText,
  showChoices: function showChoices() {
    $choices.className = '';
    $generate.className = 'hide';
    $trumpContainer.className = 'hide';
    $back.className = 'hide';
  },
  showSpeech: function showSpeech() {
    $choices.className = 'hide';
    $generate.className = '';
    $trumpContainer.className = '';
    $back.className = '';
  },
  addChoiceEvent: function addChoiceEvent(choice, chooseEvent) {
    document.querySelector("#choice-".concat(choice)).addEventListener('click', chooseEvent(choice));
  },
  setGenerateTextFunc: function setGenerateTextFunc(event) {
    $generate.addEventListener('click', function () {
      return setTrumpText(event());
    });
  }
};

/***/ })
/******/ ]);