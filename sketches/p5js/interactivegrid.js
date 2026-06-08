let spacing = 35;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background('#131B23'); // Gunmetal background
    
    let cols = floor(width / spacing);
    let rows = floor(height / spacing);
    
    // Smooth circle scaling and color interpolation based on mouse distance
    for (let x = 0; x <= cols; x++) {
        for (let y = 0; y <= rows; y++) {
            let px = x * spacing;
            let py = y * spacing;
            
            // Distance from the circle's position to the mouse
            let d = dist(mouseX, mouseY, px, py);
            
            // Map distance to diameter (closer = larger)
            let size = map(d, 0, 250, 28, 4, true);
            
            // Interpolate color based on distance: blue close-up, parchment far-away
            let col = lerpColor(color('#2274A5'), color('#E7DFC6'), map(d, 0, 250, 0, 1, true));
            
            fill(col);
            noStroke();
            ellipse(px, py, size, size);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
