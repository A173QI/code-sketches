let sentence = "Follow the rhythm of my pointer let's goooo bludyyyy mate oh my pointer wtf";
let words = sentence.split(" ");
let wordIndex = 0;
let lastX = 0;
let lastY = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(34);
    textAlign(CENTER, CENTER);
    background('#131B23'); // Gunmetal background drawn once
}

function draw() {
    // Empty draw loop to keep the canvas active
}

function mouseMoved() {
    if (lastX === 0 && lastY === 0) {
        lastX = mouseX;
        lastY = mouseY;
    }

    let word = words[wordIndex];
    let d = dist(mouseX, mouseY, lastX, lastY);

    // Spacing based on word width
    if (d > textWidth(word) + 20) {
        let angle = atan2(mouseY - lastY, mouseX - lastX);

        push();
        translate(mouseX, mouseY);
        rotate(angle);

        // Alternating palette colors
        const colors = ['#E9F1F7', '#2274A5', '#E7DFC6', '#816C61'];
        fill(colors[wordIndex % colors.length]);
        noStroke();

        text(word, 0, 0);
        pop();

        lastX = mouseX;
        lastY = mouseY;
        wordIndex = (wordIndex + 1) % words.length;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background('#131B23');
}
