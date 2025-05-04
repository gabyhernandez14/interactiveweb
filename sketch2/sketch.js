let isSize = 100;
let isOpacity = 255;
let isShaking = false;
let words = [];
let isGrowing = false;
let butterfly;  

let butterflyX, butterflyY;
let delayFactor = 0.1;  

function preload() {
  font = loadFont('HelvetiHand.ttf');  
  butterfly = loadImage('butterfly.png'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
  noStroke();
  
  butterflyX = width / 2;
  butterflyY = height / 2;
  
  butterfly.resize(50, 0);  
}

function draw() {
  background('#020B26'); 

  fill(255, isOpacity);
  textSize(isSize);

  if (isShaking) {
    let shakeX = random(-10, 10);
    let shakeY = random(-10, 10);
    text("is", width / 2 + shakeX, height / 2 + shakeY);
  } else {
    text("is", width / 2, height / 2);
  }

  for (let i = 0; i < words.length; i++) {
    let w = words[i];
    fill(255, w.opacity);
    textSize(w.size);
    text("is", w.x, w.y);
    
    w.opacity -= 2;
    if (w.opacity <= 0) {
      words.splice(i, 1);  
    }
  }

  butterflyX += (mouseX - butterflyX) * delayFactor;
  butterflyY += (mouseY - butterflyY) * delayFactor;
  
  image(butterfly, butterflyX - butterfly.width / 2, butterflyY - butterfly.height / 2);
}

function mousePressed() {
  isGrowing = true;
  isShaking = true;  
  isSize = 150;  
  isOpacity = 255;

  let numWords = 35;  

  for (let i = 0; i < numWords; i++) {
    let word = {
      x: random(width),
      y: random(height),
      size: random(20, 100),  
      opacity: random(50, 200),  
    };
    words.push(word);
  }
}

function mouseReleased() {
  isShaking = false;  
  isGrowing = false;


  let fadeInterval = setInterval(() => {
    if (isSize > 100) {
      isSize -= 5;  
    }
    if (isOpacity > 0) {
      isOpacity -= 5; 
    }
    if (isSize <= 100 && isOpacity <= 0) {
      clearInterval(fadeInterval);  
    }
  }, 50);
}
