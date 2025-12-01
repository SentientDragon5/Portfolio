let particles = [];
const numParticles = 80;
const connectionDistance = 150;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    for (let i = 0; i < numParticles; i++) particles.push(new Particle());
}

function draw() {
    clear();
    let mousePos = createVector(mouseX, mouseY);
    for (let p of particles) {
        p.update();
        p.display(mousePos);
        p.connect(mousePos);
    }
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D().mult(0.5);
        this.size = random(2, 4);
        this.color = color(100, 255, 218, 150);
    }

    update() {
        this.pos.add(this.vel);
        if (this.pos.x < 0) this.pos.x = width;
        if (this.pos.x > width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = height;
        if (this.pos.y > height) this.pos.y = 0;
    }

    display(mousePos) {
        noStroke();
        let d = dist(this.pos.x, this.pos.y, mousePos.x, mousePos.y);
        let c = lerpColor(this.color, color(255), map(d, 0, connectionDistance, 1, 0, true))
        fill(c);
        ellipse(this.pos.x, this.pos.y, this.size);
    }

    connect(mousePos) {
        let d = dist(this.pos.x, this.pos.y, mousePos.x, mousePos.y);
        if (d < connectionDistance) {
            stroke(100, 255, 218, map(d, 0, connectionDistance, 100, 0));
            strokeWeight(1);
            line(this.pos.x, this.pos.y, mousePos.x, mousePos.y);
        }
    }
}