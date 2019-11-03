function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255);
  posX = width/2;
  posY = height/2;
}

let circleSize = 200;
let posX, posY;
let speedX = -2, speedY = -3;

function draw() {
  background(0);
  circle(posX,posY,circleSize);
  posX += speedX;
  posY += speedY;
  if (abs(posX - width/2) > width/2 - circleSize) {
    posX = width/2 + sign(posX - width/2) * (width/2 - circleSize);
    speedX = -speedX;
  }
  if (abs(posY - height/2) > height/2 - circleSize) {
    posY = height/2 + sign(posY - height/2) * (height/2 - circleSize);
    speedY = -speedY;
  }
}

function sign(val) {
  if (val === 0) return 0;
  return val > 0 ? 1 : -1;
}
