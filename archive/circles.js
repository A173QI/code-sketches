function setup() {
  createCanvas(400, 400);
  background('#E9F1F7');
}

var size = 10;

function draw() {
  noFill();
  stroke('#2274A5');
  circle(200,200,size);
  size +=10;
}