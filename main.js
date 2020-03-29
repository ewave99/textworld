let x = 0;

const movements = {
  'ArrowRight': () => x++,
  'ArrowLeft': () => x--
}

function draw() {
  CHARS = [];
  ellipse(50+x, 50, 30, 20);
}

document.onkeydown = function(e) {
  if (Object.keys(movements).includes(e.code)) {
    movements[e.code]();
  }
}
