let numSegments = 40;
let x = [];
let y = [];
const palette = ['#E9F1F7', '#2274A5', '#E7DFC6', '#816C61'];

function setup() {
    createCanvas(windowWidth, windowHeight);
    // Initialize the segments in the center
    for (let i = 0; i < numSegments; i++) {
        x.push(width / 2);
        y.push(height / 2);
    }
}

function draw() {
    background('#131B23'); // Gunmetal background
    
    // Shift position values to make the segments follow each other
    for (let i = numSegments - 1; i > 0; i--) {
        x[i] = x[i - 1];
        y[i] = y[i - 1];
    }
    
    // The head (segment 0) follows the mouse, undulating up and down using sine wave
    x[0] = mouseX;
    y[0] = mouseY + sin(frameCount * 0.15) * 45;
    
    // Draw all segments with decreasing size and cycling palette colors
    for (let i = 0; i < numSegments; i++) {
        let size = map(i, 0, numSegments, 45, 8);
        let col = color(palette[i % palette.length]);
        
        fill(col);
        noStroke();
        ellipse(x[i], y[i], size, size);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
