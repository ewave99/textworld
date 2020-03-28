setupEnvironment();

function ellipse(x, y, w, h) {
  for (var angle = 0; angle < 360; angle++) {
    let rad = angle * Math.PI / 180;
    let px = Math.round(Math.cos(rad) * w + x);
    let py = Math.round(Math.sin(rad) * h / 2 + y);
    let within_bound_x = (px > 0 && px < CHARS_ACROSS);
    let within_bound_y = (py > 0 && py < CHARS_DOWN);
    if (within_bound_x && within_bound_y) {
      let index = py * CHARS_ACROSS + px;
      CHARS[index] = 1;
    }
  }
}
