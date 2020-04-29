let controlpanel;
let bound_left = 21;

function setup() {
  CHARS = [];
  controlpanel = new ControlPanel();
  controlpanel.draw();
}

function windowResize() {
  CHARS = [];
  controlpanel.draw();
}

function mouseMove(e) {
  // console.log(e.clientX, e.clientY);
}
