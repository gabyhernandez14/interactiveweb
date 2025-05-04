let font;
let glitchOffsets = [];
let glitchTimer = 0;
let stretchFactor = 1;
let stretching = false;
let burstWords = [];
let butterfly;
let butterflyX = -100;
let butterflyY;
let butterflySpeed = 1.5;


function preload() {
  font = loadFont('HelvetiHand.ttf'); 
  butterfly = loadImage("butterfly.png"); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textAlign(CENTER, CENTER);
  textSize(100);
  noStroke();
}

function draw() {
  background(255);

  let baseX = width / 2;
  let baseY = height / 2;
  let word = "strange";

  push();

  if (stretching) {
    stretchFactor = lerp(stretchFactor, 1.5, 0.1);
  } else {
    stretchFactor = lerp(stretchFactor, 1, 0.05);
  }

  translate(baseX, baseY);
  scale(stretchFactor, 1 + sin(frameCount * 0.2) * 0.1);
  translate(-baseX, -baseY);

  if (frameCount % 4 === 0) { //chat helped me with the glitch format, mainly the RGB                                     values were giving me the most issues
    glitchOffsets = [
      { x: random(-8, 8), y: random(-4, 4), color: color(255, 0, 0, 120) },
      { x: random(-6, 6), y: random(-4, 4), color: color(0, 255, 0, 120) },
      { x: random(-6, 6), y: random(-4, 4), color: color(0, 0, 255, 120) }
    ];
    glitchTimer = 4;
  }

  if (glitchTimer > 0) {
    for (let g of glitchOffsets) {
      fill(g.color);
      text(word, baseX + g.x, baseY + g.y);
    }
    glitchTimer--;
  }

  fill(0);
  text(word, baseX, baseY);
  pop();

  for (let i = burstWords.length - 1; i >= 0; i--) {
    let b = burstWords[i];
    fill(b.color.levels[0], b.color.levels[1], b.color.levels[2], b.alpha);
    textSize(b.size);
    text(word, b.x, b.y);
    b.alpha -= 2;
    if (b.alpha <= 0) {
      burstWords.splice(i, 1);
    }
    // Butterfly movement
    butterflyY = height / 2 + sin(frameCount * 0.05) * 100; // gentle wave motion
    image(butterfly, butterflyX, butterflyY, 80, 80);
    butterflyX += butterflySpeed;

    if (butterflyX > width + 100) {
       butterflyX = -100; // reset to left side
}

  }
}

function mousePressed() {
  stretching = true;

  // Add multiple colorful "strange" words at random positions
  for (let i = 0; i < 7; i++) {
    burstWords.push({
      x: random(width),
      y: random(height),
      size: random(40, 120),
      alpha: 255,
      color: color(random(255), random(255), random(255))
    });
  }
}

function mouseReleased() {
  stretching = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
