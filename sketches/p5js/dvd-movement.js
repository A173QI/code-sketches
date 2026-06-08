let posX = 200;
let posY = 200;

let size = 12;
let vitX = 19.43;
let vitY = 19.21;

const palette = ['#2274A5', '#E7DFC6', '#816C61', '#E9F1F7'];
let fillIndex = 0;
let strokeIndex = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#131B23'); // --clr-gunmetal
}

function draw() {
    // Note: background is not cleared to leave a trail of shapes
    
    stroke(palette[strokeIndex]);
    fill(palette[fillIndex]);

    let bounced = false;

    // Fix: posX is horizontal (width) and posY is vertical (height)
    if (posX >= width - size || posX <= 0) {
        vitX = vitX * -1;
        bounced = true;
    }

    if (posY >= height - size || posY <= 0) {
        vitY = vitY * -1;
        bounced = true;
    }

    if (bounced) {
        fillIndex = (fillIndex + 1) % palette.length;
        strokeIndex = (strokeIndex + 1) % palette.length;
    }

    circle(posX, posY, size);
    square(posX, posY, size);
    posX += vitX;
    posY += vitY;
}

function keyPressed() {
    if (key === "s") {
        save("dessin.png");
    }
}