function mouseDown(e) {
  mouseX = mouseX_prev = e.clientX;
  mouseY = mouseY_prev = e.clientY;
  origin = current = getCharPos(mouseX, mouseY);

  controlpanel.mouseclick(origin);

  layer0 = snapshot(bound_left, 0, CHARS_ACROSS-bound_left, CHARS_DOWN);

  TEMP_DRAW[controlpanel.radio.activelabel]();
}

function mouseDrag(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  current = getCharPos(mouseX, mouseY);
  if (controlpanel.radio.activelabel != 'PEN')
    image(bound_left, 0, layer0, {update:true});
  if (mouseX != mouseX_prev || mouseY != mouseY_prev) {
    TEMP_DRAW[controlpanel.radio.activelabel]();
  }
}
