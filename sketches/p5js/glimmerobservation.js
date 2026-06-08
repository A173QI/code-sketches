var size = 33;
var ancienX;
var ancienY;

const palette = ['#E9F1F7', '#2274A5', '#E7DFC6', '#131B23', '#816C61'];
let currentBgColor = '#E9F1F7';

function setup() {
    frameRate(999);
    createCanvas(windowWidth, windowHeight);
    ancienX = windowWidth / 2;
    ancienY = windowHeight / 2;
    randomColor();
}

function draw() {
    ancienX = ancienX + ((mouseX - ancienX) / 100);
    ancienY = ancienY + ((mouseY - ancienY) / 100);
    circle(ancienX, ancienY, size);
}

function keyPressed() {
    if (key === "s") {
        save("dessin.png");
    }
    if (key === "x") {
        background(currentBgColor);
    }
}

function randomColor() {
    // Select a random background from the palette
    currentBgColor = random(palette);
    
    // Select a different fill color from the palette to ensure contrast
    let fillCol;
    do {
        fillCol = random(palette);
    } while (fillCol === currentBgColor);

    background(currentBgColor);
    fill(fillCol);
    stroke(currentBgColor); // Stroke matches background for borderless look
    size = random(25, 250);
}

function mouseClicked() {
    randomColor();
}