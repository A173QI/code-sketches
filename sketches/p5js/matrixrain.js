let streams = [];
let symbolSize = 20;

function setup() {
    createCanvas(windowWidth, windowHeight);
    let cols = floor(width / symbolSize);
    for (let i = 0; i < cols; i++) {
        streams.push({
            x: i * symbolSize,
            y: random(-1000, 0),
            speed: random(3, 8),
            // Assign a random character set range
            charOffset: random(0, 96)
        });
    }
    textSize(symbolSize);
    textAlign(CENTER, TOP);
}

function draw() {
    // Semi-transparent background for the trailing glow effect
    background(19, 27, 35, 25);
    
    for (let s of streams) {
        // Highlighting the leading character (white/parchment color)
        if (random() > 0.9) {
            fill('#E7DFC6'); // Bright highlight
        } else {
            fill('#2274A5'); // Classic project blue
        }
        
        // Pick a random Katakana character
        let charCode = 0x30A0 + floor(random(0, 96));
        let char = String.fromCharCode(charCode);
        
        text(char, s.x, s.y);
        s.y += s.speed;
        
        // Wrap around when off-screen
        if (s.y > height) {
            s.y = random(-300, 0);
            s.speed = random(3, 8);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(19, 27, 35);
}
