const palette = ['#E9F1F7', '#2274A5', '#E7DFC6', '#816C61'];

function setup() {
    frameRate(3);
    createCanvas(400, 400);
    background('#131B23'); // --clr-gunmetal
}

var paul = 120;

function draw() {
    noFill();
    
    // Dynamically cycle stroke color through the palette as circles expand
    let strokeCol = palette[Math.floor(paul / 5) % palette.length];
    stroke(strokeCol);
    strokeWeight(1.5);

    circle(200, 60, paul);
    circle(200, 60, paul);
    circle(200, 60, paul);
    circle(100, 60, paul);

    paul = paul + 5;
}