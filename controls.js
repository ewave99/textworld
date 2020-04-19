function ControlPanel() {
  this.labels = [
    'PEN',
    'LINE',
    'RECT',
    'ELLIPSE',
    'ARC'
  ];
  this.draw = function () {
    line(CHARS_ACROSS-21, 0, CHARS_ACROSS-21, CHARS_DOWN, {strokevalue:'|'});
    for (var i = 0; i < this.labels.length; i++) {
      label(
        CHARS_ACROSS-7, i*3-1,
        this.labels[i],
        {reverse_x:true}
      );
    }
  }
}
