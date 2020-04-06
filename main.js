let offsetx = 0, offsety = 0;

const movements = {
  'ArrowRight': () => offsetx+=2,
  'ArrowLeft': () => offsetx-=2,
  'ArrowUp': () => offsety--,
  'ArrowDown': () => offsety++
}

function drawWorld() {
  let simplex = new SimplexNoise();
  let pointsacross = 10;
  let heights = _.range(pointsacross).map(i => Math.round((simplex.noise2D(i, 0)+1)*10));
  let interval = Math.floor(CHARS_ACROSS / pointsacross);
  for (var i = 0; i < heights.length-1; i++) {
    let x1 = i * interval;
    let y1 = heights[i];
    point(x1, y1)
  }
  updateDisplay();
}

function draw() {
  CHARS = [];
  // drawWorld();
}

document.onkeydown = function(e) {
  if (Object.keys(movements).includes(e.code)) {
    movements[e.code]();
    draw();
  }
}
