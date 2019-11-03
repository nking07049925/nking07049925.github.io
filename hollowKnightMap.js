function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255);
  posX = width/2;
  posY = height/2;
  circleSize = min(width,height)/8;
}

let circleSize;
let posX, posY;
let speedX = -2, speedY = -3;

function draw() {
  background(0);
  circle(posX,posY,circleSize);
  posX += speedX;
  posY += speedY;
  if (abs(posX - width/2) > width/2 - circleSize/2) {
    posX = width/2 + sign(posX - width/2) * (width/2 - circleSize/2);
    speedX = -speedX;
  }
  if (abs(posY - height/2) > height/2 - circleSize) {
    posY = height/2 + sign(posY - height/2) * (height/2 - circleSize/2);
    speedY = -speedY;
  }
}

function sign(val) {
  if (val === 0) return 0;
  return val > 0 ? 1 : -1;
}
