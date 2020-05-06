let mouseX, mouseY,
  mouseX_origin, mouseY_origin,
  mouseX_prev, mouseY_prev;
let origin, current;
let layer0;

TEMP_DRAW = {
  'PEN': () => {
    plot(current.x, current.y, {
      update:true,
      bound_left:bound_left
    });
  },
  'LINE': () => {
    line(origin.x, origin.y, current.x, current.y, {
      update:true,
      bound_left:bound_left
    });
  },
  'RECT': () => {
    rect(origin.x, origin.y, current.x-origin.x, current.y-origin.y, {
      update:true,
      bound_left:bound_left
    });
  },
  'ELLIPSE': () => {
    ellipse(
      (origin.x+current.x)/2, (origin.y+current.y)/2,
      (current.x-origin.x)/2, (current.y-origin.y)/2, {
      update:true,
      bound_left:bound_left
    });
  }
};
