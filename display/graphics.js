// These are pre-defined sets of values so the program doesn't need
//   to calculate cos and sin every time it draws.
const COS_TABLE = _.range(360).map(i => Math.cos(i * Math.PI / 180));
const SIN_TABLE = _.range(360).map(i => Math.sin(i * Math.PI / 180));

function plot(x, y, fillvalue=1, update=true) {
  let within_bound_x = (x >= 0 && x < CHARS_ACROSS);
  let within_bound_y = (y >= 0 && y < CHARS_DOWN);
  if (within_bound_x && within_bound_y) {
    let index = y * CHARS_ACROSS + x;
    CHARS[index] = fillvalue;
  }
  if (update) {
    updateDisplay();
  }
}

function ellipse(x, y, w, h, { // The syntax here allows keyword arguments
  stroke = true,
  strokevalue = 1,
  fill = false,
  fillvalue = 1,
  update = true
} = {}) {
  // If the width is more than 115 then the outline starts to 'crack'
  //   as the angles aren't precise enough.
  // Could be fixed by drawing line segments between each point if the width
  //   exceeds 115.
  if (stroke) {
    if (w >= 57) {
      let p1x, p1y, p2x, p2y;
      for (var i = 0; i < 360; i++) {
        p1x = Math.round(COS_TABLE[i] * w + x);
        p1y = Math.round(SIN_TABLE[i] * h + y);
        p2x = Math.round(COS_TABLE[(i+1)%360] * w + x);
        p2y = Math.round(SIN_TABLE[(i+1)%360] * h + y);
        line(p1x, p1y, p2x, p2y, strokevalue, false)
      }
    } else {
      let px, py;
      for (var i = 0; i < 360; i++) {
        px = Math.round(COS_TABLE[i] * w + x);
        py = Math.round(SIN_TABLE[i] * h + y);
        plot(px, py, strokevalue, false);
      }
    }
  }
  if (fill) {
    // I got this algorithm off StackOverflow
    let hh = h*h;
    let ww = (w+1)*(w+1);
    let hhww = hh*ww;
    let x0 = w;
    let dx = 0;
    for (var px = 1-w; px <= w-1; px++) {
      plot(px+x, y, fillvalue, false);
    }
    for (var py = 1; py < h; py++) {
      let x1 = x0 - (dx - 1);
      for (; x1 > 0; x1--) {
        if (x1*x1*hh + py*py*ww < hhww) break;
      }
      dx = x0 - x1;
      x0 = x1;
      for (var px = 1-x0; px <= x0-1; px++) {
        plot(px+x, -py+y, fillvalue, false);
        plot(px+x, py+y, fillvalue, false);
      }
    }
  }
  if (update) {
    updateDisplay();
  }
}

function rect(x, y, w, h, {
  stroke = true,
  strokevalue = 1,
  fill = false,
  fillvalue = 1,
  update = true
} = {}) {
  if (fill) {
    for (var j = 1; j < h; j++) {
      for (var i = 1; i < w; i++) {
        plot(i+x, j+y, fillvalue, false);
      }
    }
  }
  if (stroke) {
    line(x, y, x+w, y, strokevalue, false);
    line(x+w, y, x+w, y+h, strokevalue, false);
    line(x+w, y+h, x, y+h, strokevalue, false);
    line(x, y+h, x, y, strokevalue, false);
  }
  if (update) {
    updateDisplay();
  }
}

function arc(x, y, w, h, start, end, strokevalue=1, update=true) {
  // Uses the ellipse algorithm but only draws part of the outline
  let px, py;
  if (start > end) {
    end = 360+(end % 360);
  }
  for (var i = start; i <= end; i++) {
    px = Math.round(COS_TABLE[i % 360] * w + x);
    py = Math.round(SIN_TABLE[i % 360] * h + y);
    plot(px, py, strokevalue, false);
  }
  if (update) {
    updateDisplay();
  }
}

function line(x0, y0, x1, y1, strokevalue=1, update=true) {
  let dx = Math.abs(x1-x0);
  let dy = -Math.abs(y1-y0);
  // Optimize performance when drawing vertical / horizontal lines
  if (dy == 0) {
    if (x0 > x1) {
      var temp = x1;
      x1 = x0;
      x0 = temp;
    }
    for (var i = x0; i <= x1; i++) {
      plot(i, y0, strokevalue, false);
    }
  } else if (dx == 0) {
    if (y0 > y1) {
      var temp = y1;
      y1 = y0;
      y0 = temp;
    }
    for (var i = y0; i <= y1; i++) {
      plot(x0, i, strokevalue, false);
    }
  } else { // BRESENHAM'S LINE ALGORITHM
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx + dy;
    while (x0 != x1 || y0 != y1) {
      plot(x0, y0, strokevalue, false);
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
    plot(x0, y0, strokevalue, false);
  }
  if (update) {
    updateDisplay();
  }
}