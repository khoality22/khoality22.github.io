// Write a p5js sketch that draws a painting in the abstract and colorful style of Wassily Kandinsky. Add animation. Give me just the javascript.

let shapes = [];

function setup() {
  createCanvas(800, 600);
  noStroke();

  // Generate random abstract shapes
  for (let i = 0; i < 20; i++) {
    shapes.push({
      type: random(["circle", "rect", "line"]),
      x: random(width),
      y: random(height),
      size: random(30, 120),
      col: color(random(255), random(255), random(255), 180),
      dx: random(-1, 1),
      dy: random(-1, 1),
      rot: random(TWO_PI),
      drot: random(-0.02, 0.02)
    });
  }
}

function draw() {
  background(240, 240, 230);

  // Animated background lines
  push();
  stroke(50, 50, 50, 40);
  strokeWeight(1);
  for (let i = 0; i < 10; i++) {
    let offset = (frameCount * 0.5 + i * 40) % width;
    line(offset, 0, offset - 200, height);
  }
  pop();

  // Draw and update shapes
  for (let s of shapes) {
    push();
    translate(s.x, s.y);
    rotate(s.rot);
    fill(s.col);

    if (s.type === "circle") {
      ellipse(0, 0, s.size);
      fill(255, 255, 255, 80);
      ellipse(0, 0, s.size * 0.5);
    } else if (s.type === "rect") {
      rectMode(CENTER);
      rect(0, 0, s.size, s.size * 0.5);
    } else if (s.type === "line") {
      stroke(s.col);
      strokeWeight(4);
      line(-s.size / 2, 0, s.size / 2, 0);
      noStroke();
    }

    pop();

    // Movement and rotation
    s.x += s.dx;
    s.y += s.dy;
    s.rot += s.drot;

    // Wrap around edges
    if (s.x < -s.size) s.x = width + s.size;
    if (s.x > width + s.size) s.x = -s.size;
    if (s.y < -s.size) s.y = height + s.size;
    if (s.y > height + s.size) s.y = -s.size;
  }

  // Overlay geometric accents
  drawAccents();
}

function drawAccents() {
  noFill();
  strokeWeight(3);

  // Large concentric circles
  push();
  translate(width * 0.75, height * 0.3);
  stroke(255, 100, 100, 150);
  ellipse(0, 0, 180);
  stroke(100, 150, 255, 150);
  ellipse(0, 0, 140);
  pop();

  // Rotating triangle
  push();
  translate(width * 0.25, height * 0.7);
  rotate(frameCount * 0.01);
  fill(255, 200, 50, 150);
  triangle(-40, 40, 40, 40, 0, -40);
  pop();
}
