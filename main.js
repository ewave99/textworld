String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

const DISPLAY = document.getElementById('display');
const TEXTSIZE = 11;
document.body.style.fontSize = TEXTSIZE.toString() + 'px';
let CHARS_ACROSS, CHARS_DOWN;
let CHAR_WIDTH, CHAR_HEIGHT;
let lines = [];

setCharDimensions();

window.onresize = function () {
  setDimensions();
}

function setCharDimensions() {
  let startwidth = Math.floor(window.innerWidth / TEXTSIZE);
  let startheight = Math.floor(window.innerHeight / TEXTSIZE);
  DISPLAY.textContent = ('.'.repeat(startwidth)+'\n').repeat(startheight);
  CHAR_WIDTH = DISPLAY.offsetWidth / startwidth;
  CHAR_HEIGHT = DISPLAY.offsetHeight / startheight;
  DISPLAY.textContent = '';
}

function setDimensions() {
  CHARS_ACROSS = Math.floor(window.innerWidth / CHAR_WIDTH )-2;
  CHARS_DOWN = Math.floor(window.innerHeight / CHAR_HEIGHT)-2;
  DISPLAY.textContent = ('x'.repeat(CHARS_ACROSS)+'\n').repeat(CHARS_DOWN);
}
