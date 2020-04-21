let controlpanel;
let mouseX, mouseY, mouseX_prev, mouseY_prev;

function setup() {
  CHARS = [];
  controlpanel = new ControlPanel();
  controlpanel.init();
}

function windowResize() {
  CHARS = [];
  controlpanel.redraw();
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
  // rect(0, 0, CHARS_ACROSS-21, CHARS_DOWN, {fill:true, fillvalue:0, stroke:false});
  plot(pos.x, pos.y, {update:true, bound_right:CHARS_ACROSS-21});
}

function mouseDown(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  let pos = getCharPos(mouseX, mouseY);
  controlpanel.mouseclick(pos);
  mouseDraw(e);
  mouseX_prev = mouseX;
  mouseY_prev = mouseY;
}
function mouseUp() {
}
function mouseDrag(e) {
  mouseDraw(e);
}
