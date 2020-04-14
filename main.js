function setup() {
  CHARS = [];
}

function draw() {
  CHARS = [];
  label(10, 10, 'All human beings are born free and equal in dignity and rights.')
  label(25, 20, 'They are endowed with reason and conscience and should act toward one\
  another in a spirit of brotherhood.')
}

function mouseDraw(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  let cx = Math.floor(mouseX / CHAR_WIDTH)-2;
  let cy = Math.floor((mouseY-0.5) / CHAR_HEIGHT)-1;
  plot(cx, cy);
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
