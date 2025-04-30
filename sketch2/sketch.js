let font;
let baseFontSize = 150;
let fontSize = baseFontSize;
let grow = false;
let shakeAmount = 0;

function preload() {
  font = loadFont('HelvetiHand.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
}

function draw() {
  background('#020B26'); 

  let x = width / 2;
  let y = height / 2;

  if (grow) {
    fontSize = lerp(fontSize, 250, 0.1);
    shakeAmount = 8;
  } else {
    fontSize = lerp(fontSize, baseFontSize, 0.1);
    shakeAmount = 0;
  }

  push();
  translate(random(-shakeAmount, shakeAmount), random(-shakeAmount, shakeAmount));
  textSize(fontSize);
  fill(255); 
  text('is', x, y);
  pop();
}

function mousePressed() {
  grow = true;
}

function mouseReleased() {
  grow = false;
}
