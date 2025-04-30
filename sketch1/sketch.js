let font;
let fontSize;
let butterflies = [];
let word = "Life";
let hover = false;
let bounds;
let butterflyImg;

function preload() {
  font = loadFont('HelvetiHand.ttf');         
  butterflyImg = loadImage('butterfly.png');  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fontSize = height * 0.5;
  textFont(font);
  textSize(fontSize);

  bounds = font.textBounds(word, 0, 0, fontSize);
  let x = width / 2 - bounds.w / 2;
  let y = height / 2 + bounds.h / 2;

  for (let i = 0; i < 300; i++) {  
    let pt = createVector(random(x, x + bounds.w), random(y - bounds.h, y));
    butterflies.push(new Butterfly(pt.x, pt.y));
  }
}

function draw() {
  background(255);
  let x = width / 2 - bounds.w / 2;
  let y = height / 2 - bounds.h / 2;
  hover = mouseX > x && mouseX < x + bounds.w &&
          mouseY > y && mouseY < y + bounds.h;

 
  for (let b of butterflies) {
    b.update(hover);
    b.display();
  }

  
  fill(0);  
  noStroke();
  textAlign(CENTER, CENTER);
  text(word, width / 2, height / 2);
}

function mousePressed() {
  for (let b of butterflies) {
    b.reset();
  }
}

class Butterfly {
  constructor(x, y) {
    this.origin = createVector(x, y); 
    this.pos = createVector(x, y);    
    this.vel = p5.Vector.random2D().mult(random(2, 4));  
    this.flying = false;
  }

  update(hovering) {
    if (hovering) this.flying = true;
    if (this.flying) {
      this.pos.add(this.vel);
    }
  }

  display() {
    imageMode(CENTER);
    image(butterflyImg, this.pos.x, this.pos.y, 64, 64);  
  }

  reset() {
    this.pos = this.origin.copy();
    this.flying = false;
  }
}
