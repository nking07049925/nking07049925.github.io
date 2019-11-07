let scale = 1;
let minScale = 1;
let maxScale = 5;
let defSize = 400;

function setup() {
  div = createDiv();
  let body = div.parent();
  body.style.overflow = 'hidden';
  body.style.background = 'rgb(30, 30, 50)';
  
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  cursor('GRAB');
  stroke(0);
  fill(255);

  defSize = windowHeight;

  div.position(0,0);
  div.html('<img src="drawing.svg" alt="svg did an F">');
  div.attribute('style','-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;');
  div.attribute('unselectable', 'on');
  div.attribute('onselectstart','return false;');
  div.attribute('onmousedown','return false;');
  div.child()[0].width = defSize;
  div.child()[0].height = defSize;
}

let posX = 0, posY = 0, d = 100;

function draw() {
  clear();
  div.position(posX,posY);
  circle(posX+140*scale, posY+120*scale, 10 * scale+30);
}

function mousePressed() {
  cursor('GRABBING');
}

let pscale = 1;

function mouseDragged() {
  posX += mouseX - pmouseX;
  posY += mouseY - pmouseY;
}

function mouseReleased() {
  cursor('GRAB');
}

function mouseWheel(event) {
  pscale = scale;
  scale *= pow(0.85, event.deltaY/100);
  scale = constrain(scale, minScale, maxScale);
  posX = (posX - mouseX) * scale / pscale + mouseX;
  posY = (posY - mouseY) * scale / pscale + mouseY;
  div.child()[0].width = defSize * scale;
  div.child()[0].height = defSize * scale;
  return false;
}