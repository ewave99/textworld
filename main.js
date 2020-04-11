function draw() {
  CHARS = [];
}

let mouseX, mouseY;
function mouseDown(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  let cx = Math.floor(mouseX / CHAR_WIDTH)-2;
  let cy = Math.floor(mouseY / CHAR_HEIGHT)-1;
  plot(cx, cy);
}
function mouseUp() {
}
function mouseDrag(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  let cx = Math.floor(mouseX / CHAR_WIDTH)-2;
  let cy = Math.floor(mouseY / CHAR_HEIGHT)-1;
  plot(cx, cy);
}
