let offsetx = 0, offsety = 0;

const movements = {
  'ArrowRight': () => offsetx+=2,
  'ArrowLeft': () => offsetx-=2,
  'ArrowUp': () => offsety--,
  'ArrowDown': () => offsety++
}

function draw() {
  CHARS = [];
  ellipse(10, 10, 5, 5)
  rect(50+offsetx, 50+offsety, 50, 25, {fill:true, fillvalue:0});
}

document.onkeydown = function(e) {
  if (Object.keys(movements).includes(e.code)) {
    movements[e.code]();
    draw();
  }
}
