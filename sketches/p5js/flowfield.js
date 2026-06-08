let spacing = 25;
const palette = ['#E9F1F7', '#2274A5', '#E7DFC6', '#816C61'];

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background('#131B23'); // Gunmetal background

    let cols = floor(width / spacing);
    let rows = floor(height / spacing);

    let time = frameCount * 0.008;

    // Grid of vector needles pointing in directions controlled by Perlin noise
    for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
            let px = x * spacing + spacing / 2;
            let py = y * spacing + spacing / 2;

            // Calculate distance to mouse to distort flow field locally
            let d = dist(mouseX, mouseY, px, py);
            let mouseForce = map(d, 0, 300, 2, 0, true);

            // Compute noise angle
            let n = noise(x * 0.08, y * 0.08, time);
            let angle = n * TWO_PI + mouseForce * atan2(mouseY - py, mouseX - px);

            // Alternate colors across grid
            let colIndex = (x + y) % palette.length;
            stroke(palette[colIndex]);
            strokeWeight(1.5);

            push();
            translate(px, py);
            rotate(angle);

            // Draw a small line representing the vector
            line(-spacing * 0.4, 0, spacing * 0.4, 0);
            // Draw a tiny arrow-head dot
            fill(palette[colIndex]);
            noStroke();
            ellipse(spacing * 0.4, 0, 3, 3);
            pop();
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
