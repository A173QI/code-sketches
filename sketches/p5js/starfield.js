let stars = [];
let numStars = 500;

function setup() {
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(-width, width),
            y: random(-height, height),
            z: random(width)
        });
    }
}

function draw() {
    background('#131B23'); // Gunmetal background
    
    // Move origin to the center of the screen
    translate(width / 2, height / 2);
    
    // Mouse X controls the warp speed
    let speed = map(mouseX, 0, width, 1, 30, true);
    
    fill('#E9F1F7'); // Ice blue stars
    noStroke();
    
    for (let s of stars) {
        // Move star closer
        s.z -= speed;
        
        // Reset star if it passes the camera/screen
        if (s.z <= 0) {
            s.z = width;
            s.x = random(-width, width);
            s.y = random(-height, height);
        }
        
        // Project 3D coordinates (x, y, z) to 2D screen coordinates (sx, sy)
        let sx = map(s.x / s.z, 0, 1, 0, width);
        let sy = map(s.y / s.z, 0, 1, 0, height);
        
        // Size scales up as the star gets closer
        let r = map(s.z, 0, width, 10, 0.5);
        
        ellipse(sx, sy, r, r);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
