let x = 0, y = 0;

const movements = {
  'ArrowRight': () => x+=2,
  'ArrowLeft': () => x-=2,
  'ArrowUp': () => y--,
  'ArrowDown': () => y++
}

function draw() {
  CHARS = [];
}

document.onkeydown = function(e) {
  if (Object.keys(movements).includes(e.code)) {
    movements[e.code]();
    draw();
  }
}
