function plot(x, y, fill=true, fillvalue=1) {
  let within_bound_x = (x >= 0 && x < CHARS_ACROSS);
  let within_bound_y = (y >= 0 && y < CHARS_DOWN);
  if (within_bound_x && within_bound_y) {
    let index = y * CHARS_ACROSS + x;
    if (fill) {
      if (fillvalue === 0 || fillvalue === 1) {
        CHARS[index] = fillvalue;
      }
    }
  }
}

function ellipse(x, y, w, h, fill=true, fillvalue=1) {
  for (var angle = 0; angle < 360; angle++) {
    let rad = angle * Math.PI / 180;
    let px = Math.round(Math.cos(rad) * w + x);
    let py = Math.round(Math.sin(rad) * h + y);
    plot(px, py, fill, fillvalue);
  }
  updateDisplay();
}

function rect(x, y, w, h, fill=true, fillvalue=1) {
  line(x, y, x+w, y);
  line(x+w, y, x+w, y+h);
  line(x+w, y+h, x, y+h);
  line(x, y+h, x, y);
  updateDisplay();
}

function line(x0, y0, x1, y1, fillvalue=1) {
  if (x0 > x1) {
    var temp = x1;
    x1 = x0;
    x0 = temp;
  }
  if (y0 > y1) {
    var temp = y1;
    y1 = y0;
    y0 = temp;
  }
  let dx = Math.abs(x1-x0);
  let dy = -Math.abs(y1-y0);
  if (dy == 0) {
    for (var i = x0; i <= x1; i++) {
      plot(i, y0, true, fillvalue);
    }
  } else if (dx == 0) {
    for (var i = y0; i <= y1; i++) {
      plot(x0, i, true, fillvalue);
    }
  } else {
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx + dy;
    while (x0 != x1 || y0 != y1) {
      plot(x0, y0, true, fillvalue);
      let e2 = 2 * err;
      if (e2 >= dy) {
        err += dy;
        x0 += sx;
      }
      if (e2 <= dx) {
        err += dx;
        y0 += sy
      }
    }
    plot(x0, y0, true, fillvalue);
  }
  updateDisplay();
}
