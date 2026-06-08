let particles = [];
let numParticles = 90;
const palette = ['#E9F1F7', '#2274A5', '#E7DFC6', '#816C61'];

function setup() {
    createCanvas(400, 400);
    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: random(width),
            y: random(height),
            vx: random(-2.5, 2.5),
            vy: random(-2.5, 2.5),
            size: random(8, 22),
            color: color(random(palette))
        });
    }
}

function draw() {
    // Semi-transparent background creates smooth motion trails
    background(19, 27, 35, 40);

    for (let p of particles) {
        // Update positions
        p.x += p.vx;
        p.y += p.vy;

        // Boundary check and bounce
        if (p.x - p.size / 2 < 0 || p.x + p.size / 2 > width) {
            p.vx *= -1;
            p.x = constrain(p.x, p.size / 2, width - p.size / 2);
        }
        if (p.y - p.size / 2 < 0 || p.y + p.size / 2 > height) {
            p.vy *= -1;
            p.y = constrain(p.y, p.size / 2, height - p.size / 2);
        }

        // Render
        fill(p.color);
        noStroke();
        ellipse(p.x, p.y, p.size, p.size);
    }
}

function mousePressed() {
    // Pull all particles towards the mouse click position
    for (let p of particles) {
        let angle = atan2(mouseY - p.y, mouseX - p.x);
        let pullForce = 3.5;
        p.vx += cos(angle) * pullForce;
        p.vy += sin(angle) * pullForce;
    }
}

function windowResized() {
    resizeCanvas(400, 400);
}
