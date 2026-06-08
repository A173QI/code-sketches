let angle;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background('#131B23'); // Gunmetal background
    stroke('#E9F1F7');     // Ice blue strokes
    strokeWeight(2);

    // Mouse X controls the branch angle
    angle = map(mouseX, 0, width, 0.05, PI / 2, true);

    // Start the tree from the bottom center of the canvas
    translate(width / 2, height);

    // Draw the trunk of length 160 pixels
    branch(160);
}

function branch(len) {
    // Draw the branch line
    line(0, 0, 0, -len);

    // Move to the end of that branch
    translate(0, -len);

    // Shrink the branch length
    len *= 0.67;

    // Recursive base case: stop branching when length is too small
    if (len > 6) {
        push(); // Save translation state
        rotate(angle); // Rotate right
        branch(len); // Draw branch
        pop(); // Restore state

        push(); // Save translation state
        rotate(-angle); // Rotate left
        branch(len); // Draw branch
        pop(); // Restore state
    }
}

