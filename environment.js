String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

const DISPLAY = document.getElementById('display');
const TEXTSIZE = 11;
document.body.style.fontSize = TEXTSIZE.toString() + 'px';
let CHARS_ACROSS, CHARS_DOWN;
let CHAR_WIDTH, CHAR_HEIGHT;
let CHARS = [];

function updateDisplay() {
  setLines();
  let rows = _.chunk(CHARS, CHARS_ACROSS)
  .map(row => row
    .map(char => char ? 'x' : ' ')
    .join('')
  );

  for (var i = 0; i < CHARS_DOWN; i++) {
    DISPLAY.childNodes[i*2].textContent = rows[i] ? rows[i] : ' '.repeat(CHARS_ACROSS);
  }
}

function setupEnvironment() {
  setCharDimensions();
  setDimensions();
  updateDisplay()
}

window.onresize = function () {
  setDimensions();
  updateDisplay();
}

function setLines() {
  DISPLAY.textContent = '';
  for (var i = 0; i < CHARS_DOWN; i++) {
    DISPLAY.appendChild(document.createElement('SPAN'));
    DISPLAY.appendChild(document.createElement('BR'));
  }
}

function setCharDimensions() {
  DISPLAY.textContent = '';
  let startwidth = Math.floor(window.innerWidth / TEXTSIZE);
  let startheight = Math.floor(window.innerHeight / TEXTSIZE);
  for (var i = 0; i < startheight; i++) {
    DISPLAY.appendChild(document.createElement('SPAN'));
    DISPLAY.appendChild(document.createElement('BR'));
  }
  for (var i = 0; i < startheight; i++) {
    DISPLAY.childNodes[i].textContent = '.'.repeat(startwidth);
  }
  CHAR_WIDTH = DISPLAY.offsetWidth / startwidth;
  CHAR_HEIGHT = DISPLAY.offsetHeight / startheight;
}

function setDimensions() {
  CHARS_ACROSS = Math.floor(window.innerWidth / CHAR_WIDTH )-2;
  CHARS_DOWN = Math.floor(window.innerHeight / CHAR_HEIGHT)-2;
}
