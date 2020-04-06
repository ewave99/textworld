const COS_TABLE = _.range(360).map(i => Math.cos(i * Math.PI / 180));
const SIN_TABLE = _.range(360).map(i => Math.sin(i * Math.PI / 180));

function point(x, y, fillvalue=1) {
  plot(x, y, fillvalue);
  updateDisplay();
}

function plot(x, y, fillvalue=1) {
  let within_bound_x = (x >= 0 && x < CHARS_ACROSS);
  let within_bound_y = (y >= 0 && y < CHARS_DOWN);
  if (within_bound_x && within_bound_y) {
    let index = y * CHARS_ACROSS + x;
    CHARS[index] = fillvalue;
  }
}

function ellipse(x, y, w, h, {
  stroke = true,
  strokevalue = 1,
  fill = false,
  fillvalue = 1
} = {}) {
  if (stroke) {
    let px, py;
    for (var i = 0; i < 360; i++) {
      px = Math.round(COS_TABLE[i] * w + x);
      py = Math.round(SIN_TABLE[i] * h + y);
      plot(px, py, strokevalue);
    }
  }
  if (fill) {
    let hh = h*h;
    let ww = (w+1)*(w+1);
    let hhww = hh*ww;
    let x0 = w;
    let dx = 0;
    for (var px = 1-w; px <= w-1; px++) {
      plot(px+x, y, fillvalue);
    }
    for (var py = 1; py < h; py++) {
      let x1 = x0 - (dx - 1);
      for (; x1 > 0; x1--) {
        if (x1*x1*hh + py*py*ww < hhww) break;
      }
      dx = x0 - x1;
      x0 = x1;
      for (var px = 1-x0; px <= x0-1; px++) {
        plot(px+x, -py+y, fillvalue);
        plot(px+x, py+y, fillvalue);
      }
    }
  }
  updateDisplay();
}

function rect(x, y, w, h, {
  stroke = true,
  strokevalue = 1,
  fill = false,
  fillvalue = 1
} = {}) {
  if (fill) {
    for (var j = 1; j < h; j++) {
      for (var i = 1; i < w; i++) {
        plot(i+x, j+y, fillvalue);
      }
    }
  }
  if (stroke) {
    line(x, y, x+w, y, strokevalue);
    line(x+w, y, x+w, y+h, strokevalue);
    line(x+w, y+h, x, y+h, strokevalue);
    line(x, y+h, x, y, strokevalue);
  }
  updateDisplay();
}

function arc(x, y, w, h, start, end, strokevalue=1) {
  let px, py;
  if (start > end) {
    end = 360+(end % 360);
  }
  for (var i = start; i <= end; i++) {
    px = Math.round(COS_TABLE[i % 360] * w + x);
    py = Math.round(SIN_TABLE[i % 360] * h + y);
    plot(px, py, strokevalue);
  }
  updateDisplay();
}

function line(x0, y0, x1, y1, strokevalue=1) {
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
      plot(i, y0, strokevalue);
    }
  } else if (dx == 0) {
    for (var i = y0; i <= y1; i++) {
      plot(x0, i, strokevalue);
    }
  } else {
    let sx = (x0 < x1) ? 1 : -1;
    let sy = (y0 < y1) ? 1 : -1;
    let err = dx + dy;
    while (x0 != x1 || y0 != y1) {
      plot(x0, y0, strokevalue);
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
    plot(x0, y0, strokevalue);
  }
  updateDisplay();
}
