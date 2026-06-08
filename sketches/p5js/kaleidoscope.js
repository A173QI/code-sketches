let symmetry = 8;
let angle = 360 / symmetry;
const palette = ['#E9F1F7', '#2274A5', '#E7DFC6', '#816C61'];
let currentColor;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background('#131B23'); // Gunmetal background drawn once
    currentColor = color(palette[0]);
}

function draw() {
    // Show instruction text in the corner
    drawInstructions();

    if (mouseIsPressed) {
        // Translate origin to screen center for rotation symmetry
        translate(width / 2, height / 2);

        let mx = mouseX - width / 2;
        let my = mouseY - height / 2;
        let pmx = pmouseX - width / 2;
        let pmy = pmouseY - height / 2;

        stroke(currentColor);

        for (let i = 0; i < symmetry; i++) {
            rotate(angle);

            // Adjust line weight based on mouse drag speed
            let d = dist(mx, my, pmx, pmy);
            let sw = map(d, 0, 15, 6, 1.5, true);
            strokeWeight(sw);

            // Draw regular segment
            line(mx, my, pmx, pmy);

            // Draw mirrored segment
            push();
            scale(1, -1);
            line(mx, my, pmx, pmy);
            pop();
        }
    }
}

function mousePressed() {
    // Select a random color from the palette for each stroke
    currentColor = color(random(palette));
}

function keyPressed() {
    if (key === 'c' || key === 'C') {
        background('#131B23');
    }
}

function drawInstructions() {
    push();
    noStroke();
    fill(19, 27, 35, 120);
    rect(10, 10, 240, 50, 4);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background('#131B23');
}
