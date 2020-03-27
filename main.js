String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

const DISPLAY = document.getElementById('display');
const TEXTSIZE = 11;
document.body.style.fontSize = TEXTSIZE.toString() + 'px';
let CHARS_ACROSS;
let CHARS_DOWN;
let lines;

window.onresize = function () {
  setCharsAcross();
  setCharsDown();
  setLines();
}

function setCharsAcross() {
  let ruler = document.getElementById('ruler');
  let start = Math.floor(window.innerWidth / TEXTSIZE);
  ruler.textContent = 'x'.repeat(start);
  let charwidth = ruler.offsetWidth / start;
  CHARS_ACROSS = Math.floor(window.innerWidth / charwidth)-2;
  ruler.textContent = '';
}

function setCharsDown() {
  let ruler = document.getElementById('ruler');
  let start = Math.floor(window.innerHeight / TEXTSIZE);
  ruler.innerText = 'x\n'.repeat(start);
  let charheight = ruler.offsetHeight / start;
  CHARS_DOWN = Math.floor(window.innerWidth / charheight);
  ruler.textContent = '';
}

function setLines() {
  for (var i = 0; i < lines.length; i++) {
    lines[i].innerHTML =  // change to delete node next time
  }
  lines = [];
  for (var i = 0; i < CHARS_DOWN; i++) {
    lines.push(DISPLAY.appendChild(document.createElement('SPAN')));
    DISPLAY.appendChild(document.createElement('BR'));
  }
  lines[0].textContent = '*'.repeat(CHARS_ACROSS);
}
