function draw() {
  CHARS = [];
  let dims = [
    Math.round(CHARS_ACROSS/2), Math.round(CHARS_DOWN/2),
    Math.round(CHARS_ACROSS/2-2), Math.round(CHARS_DOWN/2),
  ]
  ellipse(...dims, {fill:true});
}
