// String.prototype.replaceAt = function(index, replacement) {
//     return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
// }

const DISPLAY = document.getElementById('display');
const TEXTSIZE = 8; // works with any font size
document.body.style.fontSize = TEXTSIZE.toString() + 'px';
let CHARS_ACROSS, CHARS_DOWN;
let CHAR_WIDTH, CHAR_HEIGHT;
let CHARS = [];

let FPS = 30;

// These functions are meant to be used in the main program
//   but are defined here so as not to cause an error
function setup() {};
function draw() {};

function updateDisplay() {
  // Breaks the array CHARS into sub-arrays of length CHARS_ACROSS
  //  (the lines to display).
  // Maps 0 to space and 1 to x. (Could be any character).
  // Joins the elements in the sub-arrays, resulting in an array of strings
  //   (lines which can now be displayed).
  let rows = _.chunk(CHARS, CHARS_ACROSS)
  .map(row => row
    .map(char => char ? 'x' : ' ') // This works because 0 is a falsy value
    .join('')
  );

  for (var i = 0; i < CHARS_DOWN; i++) {
    // we need i*2 here as every other element is a span element
    //   and every other element is a break element
    DISPLAY.childNodes[i*2].textContent = rows[i] ? rows[i] : ' '.repeat(CHARS_ACROSS);
  }
}

document.body.onload = function() {
  setCharDimensions();
  setDimensions();
  setLines();
  setup();
  draw();
}

window.onresize = function () {
  setDimensions();
  setLines();
  draw();
}

function setLines() {
  // Creates spans and breaks necessary to display lines correctly
  DISPLAY.textContent = '';
  for (var i = 0; i < CHARS_DOWN; i++) {
    DISPLAY.appendChild(document.createElement('SPAN'));
    DISPLAY.appendChild(document.createElement('BR'));
  }
}

function setCharDimensions() {
  // Finds the width and height (in pixels) of a character
  //   by filling the container with a certain amount of lines,
  //   all of a certain amount of characters across,
  //   and then dividing the width of the container (which will have
  //   resized accordingly) by the number of chars across
  //   and the height of the container by the number of lines.

  DISPLAY.textContent = '';

  // Number of chars across and down to start with (could be arbitrary numbers).
  let startwidth = Math.floor(window.innerWidth / TEXTSIZE);
  let startheight = Math.floor(window.innerHeight / TEXTSIZE);

  // Populates the container with lines and characters
  for (var i = 0; i < startheight; i++) {
    DISPLAY.appendChild(document.createElement('SPAN'));
    DISPLAY.appendChild(document.createElement('BR'));
  }
  for (var i = 0; i < startheight; i++) {
    DISPLAY.childNodes[i].textContent = '.'.repeat(startwidth);
  }

  // Final calculations
  CHAR_WIDTH = DISPLAY.offsetWidth / startwidth;
  CHAR_HEIGHT = DISPLAY.offsetHeight / startheight;
}

function setDimensions() {
  CHARS_ACROSS = Math.floor(window.innerWidth / CHAR_WIDTH )-2;
  CHARS_DOWN = Math.floor(window.innerHeight / CHAR_HEIGHT)-2;
}
