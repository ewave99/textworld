function ControlPanel() {
  this.labels = [
    'PEN',
    'LINE',
    'RECT',
    'ELLIPSE',
    'ARC'
  ];
  this.init = function () {
    this.radio = {
      checkpoints: [],
      active: 0,
    };

    line(CHARS_ACROSS-21, 0, CHARS_ACROSS-21, CHARS_DOWN, {strokevalue:'|'});
    for (var i = 0; i < this.labels.length; i++) {
      label(
        CHARS_ACROSS-7, i*3+2,
        this.labels[i],
        {reverse_x:true}
      );
      label(
        CHARS_ACROSS-4, i*3+2,
        '[ ]'
      );
      this.radio.checkpoints.push([CHARS_ACROSS-3, i*3+2]);
    }
    this.select();
    updateDisplay();
  }
  this.redraw = function () {
    line(CHARS_ACROSS-21, 0, CHARS_ACROSS-21, CHARS_DOWN, {strokevalue:'|'});
    for (var i = 0; i < this.labels.length; i++) {
      label(
        CHARS_ACROSS-7, i*3+2,
        this.labels[i],
        {reverse_x:true}
      );
      label(
        CHARS_ACROSS-4, i*3+2,
        '[ ]'
      );
      this.radio.checkpoints[i] = [CHARS_ACROSS-3, i*3+2];
    }
    this.select();
    updateDisplay();
  }
  this.mouseclick = function (pos) {
    let i = Math.floor((pos.y-2)/3)
    if (
      pos.x > CHARS_ACROSS-21 &&
      i >= 0 && i < this.radio.checkpoints.length &&
      this.radio.checkpoints[i][1] == pos.y
    ) {
      this.select(i);
    }
  }
  this.select = function (i) {
    if (typeof i != 'undefined') {
      plot(...this.radio.checkpoints[this.radio.active], {fillvalue:0})
      this.radio.active = i;
    }
    this.activelabel = this.labels[this.radio.active];
    plot(...this.radio.checkpoints[this.radio.active], {fillvalue:'X'});
  }
}
