function draw() {
  CHARS = [];
}

let mouseX, mouseY;

function mouseDown(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  console.log(mouseX, mouseY);
}
function mouseUp() {
  console.log(mouseX, mouseY);
}
function mouseDrag(e) {

  mouseX = e.clientX;
  mouseY = e.clientY;
}
