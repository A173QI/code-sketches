const body = document.getElementsByTagName("body")[0];
// body.style.backgroundColor = "magenta";

function setColor(name) {
    body.style.backgroundColor = name;
}

function randomColor() {
    console.log("hi");
    let R = Math.round(Math.random() * 255);
    let G = Math.round(Math.random() * 255);
    let B = Math.round(Math.random() * 255);

    // // plus compliqué
    // let theColor = "rgb(" + R + ", " + G + ", " + B + ")";

    // plus simple (§)
    theColor = `rgb(${R}, ${G}, ${B})`;

    body.style.backgroundColor = theColor


    console.log(R, G, B);

    if (R + G + B < 383) {
        body.style.color = "white";
    }
    else {
        body.style.color = "black";
    }
}

