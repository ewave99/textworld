let mouseX, mouseY,
  mouseX_origin, mouseY_origin,
  mouseX_prev, mouseY_prev;
let layer0, origin;

function mouseDown(e) {
  mouseX = mouseX_origin = mouseX_prev = e.clientX;
  mouseY = mouseY_origin = mouseY_prev = e.clientY;

  let pos = getCharPos(mouseX, mouseY);
  controlpanel.mouseclick(pos);

  if (controlpanel.radio.activelabel == 'PEN') {
    pen_draw();
  } else {
    layer0 = snapshot();
    origin = getCharPos(mouseX_origin, mouseY_origin);
  }
}

function mouseDrag(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (mouseX != mouseX_prev || mouseY != mouseY_prev) {
    if (controlpanel.radio.activelabel == 'PEN') {
      pen_draw();
    } else {
      temp_shape_draw();
    }
  }
}

function mouseUp() {

}


function pen_draw() {
  let pos = getCharPos(mouseX, mouseY);
  plot(pos.x, pos.y, {update:true, bound_left:bound_left});
}

function temp_shape_draw() {
  image(0, 0, layer0, {update:true});
  let current = getCharPos(mouseX, mouseY);
  switch (controlpanel.radio.activelabel) {
    case 'LINE':
      line(origin.x, origin.y, current.x, current.y, {
        update:true,
        bound_left:bound_left
      });
      break;
    case 'RECT':
      rect(origin.x, origin.y, current.x-origin.x, current.y-origin.y, {
        update:true,
        bound_left:bound_left
      });
      break;
    case 'ELLIPSE':
      ellipse(
        (origin.x+current.x)/2, (origin.y+current.y)/2,
        (current.x-origin.x)/2, (current.y-origin.y)/2, {
        update:true,
        bound_left:bound_left
      });
      break;
    default:

  }
}
