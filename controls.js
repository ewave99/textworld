function frame() {
  return {
    draw: function () {
      rect(CHARS_ACROSS-11, 0, 10, CHARS_DOWN-1);
    }
  }
}
