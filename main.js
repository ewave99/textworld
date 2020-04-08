/*
DEMONSTRATION WITH A SIMPLE BOUNCING BALL
*/

let balldims = [4, 2];
let ballpos;
let speed = 1;

// const movements = {
//   'ArrowRight': () => ballpos[0]+=2,
//   'ArrowLeft': () => ballpos[0]-=2,
//   'ArrowUp': () => ballpos[1]--,
//   'ArrowDown': () => ballpos[1]++
// }

function setup() {
  ballpos = [Math.round(CHARS_ACROSS/2), Math.round(CHARS_DOWN/2)];
  setInterval(draw, 1000/FPS);
}

function draw() {
  CHARS = [];
  ballpos[0] += speed;
  if (ballpos[0]+balldims[0]+1 >= CHARS_ACROSS || ballpos[0] <= 0) {
    speed = -speed;
  }
  rect(...ballpos, ...balldims, {fill:true});
}

// document.onkeydown = function(e) {
//   if (Object.keys(movements).includes(e.code)) {
//     movements[e.code]();
//     draw();
//   }
// }
