let controlpanel;

function setup() {
  CHARS = [];
  controlpanel = new ControlPanel();
}

function draw() {
  CHARS = [];
  controlpanel.draw();
  updateDisplay();
}

function getCharPos(x, y) {
  return {
    x: Math.floor(x / CHAR_WIDTH)-2,
    y: Math.floor((mouseY-0.5) / CHAR_HEIGHT)-1
  };
}

function mouseDraw(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  let pos = getCharPos(mouseX, mouseY);
  plot(pos.x, pos.y, {update:true, bound_right:CHARS_ACROSS-21});
}

let mouseX, mouseY;
function mouseDown(e) {
  mouseDraw(e);
}
function mouseUp() {
}
function mouseDrag(e) {
  mouseDraw(e);
}
