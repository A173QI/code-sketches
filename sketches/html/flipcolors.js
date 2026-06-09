const body = document.getElementsByTagName("body")[0];
// body.style.backgroundColor = "magenta";

function setColor(name) {
    body.style.backgroundColor = name;
}

function randomColor() {
    console.log("hi");
    // Generate extremely bright, popping, luminous HSL colors
    let H = Math.round(Math.random() * 360);
    let S = Math.round(92 + Math.random() * 8); // 92% to 100% saturation
    let L = Math.round(74 + Math.random() * 14); // 74% to 88% lightness for a way brighter popping background

    theColor = `hsl(${H}, ${S}%, ${L}%)`;

    body.style.backgroundColor = theColor;
    body.style.color = "black";

    // Apply color-shift flash PNG filter to all stamps and screenshot elements
    const elements = document.querySelectorAll('.deco-img, .flip-interactive, .sketch-screenshot');
    const randomHue = Math.round(Math.random() * 360);
    const filterVal = `hue-rotate(${randomHue}deg) brightness(1.2) contrast(1.25)`;
    
    elements.forEach(el => {
        el.style.transition = 'filter 0.08s ease';
        el.style.filter = filterVal;
    });

    // Smoothly restore original styles after a short delay (350ms)
    setTimeout(() => {
        elements.forEach(el => {
            el.style.transition = 'filter 0.4s ease';
            el.style.filter = '';
        });
    }, 350);

    console.log("HSL color:", theColor);
}

