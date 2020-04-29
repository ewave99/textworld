class Radio {
  constructor(x, y, labels, interval=3, active=0) {
    this.x = x;
    this.y = y;
    this.labels = labels;
    this.interval = interval;
    this.active = active;
  }

  draw(reverse=false, spacing=3) {
    this.d = (reverse) ? -1 : 1;
    this.rows = [];
    for (var i = 0; i < this.labels.length; i++) {
      label(
        this.x, this.y+i*this.interval,
        '[ ]',
        {reverse_x:reverse}
      );
      label(
        this.x+(spacing+3)*this.d, this.y+i*this.interval,
        this.labels[i],
        {reverse_x:reverse}
      );
      this.rows.push(this.getCheckpointY(i));
    }
    this.select();
  }

  get activelabel() {
    return this.labels[this.active];
  }

  select(i) {
    if (typeof this.rows == 'undefined') {
      throw "'draw' has not been called yet"
    }
    if (typeof i != 'undefined') {
      plot(this.getCheckpointX(), this.getCheckpointY(this.active), {fillvalue:0})
      this.active = i;
    }
    plot(this.getCheckpointX(), this.getCheckpointY(this.active), {fillvalue:'X'});
  }

  getCheckpointX() {
    if (typeof this.d == 'undefined') {
      throw "'draw' has not been called yet"
    }
    return this.x+this.d;
  }

  getCheckpointY(i) {
    if (typeof this.d == 'undefined') {
      throw "'draw' has not been called yet"
    }
    return this.y+i*this.interval;
  }

  mouseclick(pos, {
    bound_left = 0,
    bound_right = CHARS_ACROSS,
  } = {}) {
    let i = Math.floor((pos.y-this.y)/this.interval)
    if (
      pos.x > bound_left && pos.x < bound_right &&
      i >= 0 && i < this.rows.length &&
      this.rows[i] == pos.y
    ) {
      this.select(i);
      updateDisplay();
      return true
    } else return false;
  }
}

class ControlPanel {
  constructor() {
    this.labels = [
      "PEN",
      "LINE",
      "RECT",
      "ELLIPSE",
      "ARC"
    ];
    this.radio = new Radio(2, 1, this.labels);
  }

  draw() {
    // rect(0, 0, 20, CHARS_DOWN, {stroke:false,fill:true,fillvalue:0});
    line(20, 0, 20, CHARS_DOWN, {strokevalue:'|'});
    this.radio.draw();
    updateDisplay();
  }

  mouseclick(pos) {
    return this.radio.mouseclick(pos, {bound_right:20});
  }
}
