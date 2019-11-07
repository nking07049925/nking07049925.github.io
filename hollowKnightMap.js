let version = '0.06'

let scale = 1;
let desiredScale = 1;
let minScale = 1;
let maxScale = 5;
let defSize = 400;
let curSize;

let myFont;
function preload() {
  myFont = loadFont('Trajan.ttf');
}

function setup() {
  div = createDiv();
  let body = div.parent();
  body.style.overflow = 'hidden';
  body.style.background = 'rgb(30, 30, 40)';
  body.style.position = 'relative';
  
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  cursor('GRAB');
  stroke(0);
  fill(255);
  textFont(myFont,40);

  defSize = windowHeight;
  curSize = defSize;
  constrainMargin = defSize * 0.2;
  posX = windowWidth/2-defSize/2;
  posY = windowHeight/2-defSize/2;
  vx = 0;
  vy = 0;

  div.position(posX, posY);
  div.size(defSize, defSize);
  div.html('<img src="drawing.svg" alt="svg did an F">');
  div.attribute('style','-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;');
  div.style('overflow', 'hidden');
  div.style('position', 'absolute');
  div.style('display','inline-block');
  div.attribute('unselectable', 'on');
  div.attribute('onselectstart','return false;');
  div.attribute('onmousedown','return false;');
  div.child()[0].width = defSize;
  div.child()[0].height = defSize;
}

let posX, posY;
let vx, vy;

function draw() {
  clear();
  updateScale();
  posX += vx;
  posY += vy;
  div.position(posX,posY);
  circle(posX+0*scale, posY+0*scale, 10 * scale+30);
  text('Version '+version,0,40);
  let velK = map(scale, minScale, maxScale, 0.7, 0.9);
  vx *= velK;
  vy *= velK;
}

let constrainMargin;

function constrainPos() {
  posX = constrain(posX, -curSize+constrainMargin, windowWidth-constrainMargin);
  posY = constrain(posY, -curSize+constrainMargin, windowHeight-constrainMargin);
}

function mousePressed() {
  cursor('GRABBING');
  maxVel = 0;
  vx = 0;
  vy = 0;
  vels = [];
}

let pscale = 1;

function mouseDragged() {
  posX += mouseX - pmouseX;
  posY += mouseY - pmouseY;
  let tx = mouseX - pmouseX;
  let ty = mouseY - pmouseY;
  let len = mag(tx, ty);
  vels.push(len);
  if (vels.length > 5) vels.shift();
  constrainPos();
}

let vels = [];

function getMax(arr) {
  if (arr[0]) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    return max;
  }
  return 0;
}

function mouseReleased() {
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  if (dx === 0 && dy === 0) {
    vx = 0;
    vy = 0;
  } else {
    let len = mag(dx, dy);
    let maxVel = getMax(vels);
    vx = dx * maxVel / len;
    vy = dy * maxVel / len;
  }
  
  cursor('GRAB');
}

let scrollSpeed = 0;

function mouseWheel(event) {
  if (scrollSpeed === 0) scrollSpeed = abs(event.deltaY);
  desiredScale *= pow(0.85, event.deltaY/scrollSpeed);
  desiredScale = constrain(desiredScale, minScale, maxScale);
  return false;
}

function updateScale() {
  pscale = scale;
  scale = lerp(scale, desiredScale, 0.3);
  posX = (posX - mouseX) * scale / pscale + mouseX;
  posY = (posY - mouseY) * scale / pscale + mouseY;
  curSize = defSize * scale;

  constrainPos();

  div.size(curSize, curSize);
  div.child()[0].width = curSize;
  div.child()[0].height = curSize;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}