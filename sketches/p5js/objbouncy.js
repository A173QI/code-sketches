// Bouncy Object
let bouncy = {

    size: 16,
    posX: 10,
    posY: 15,
    vitX: 1.2,
    vitY: 0.9,
    name: "un chien",
    color: '#2274A5', // --clr-blue

    update: function () {
        this.posX = this.posX + this.vitX;
        this.posY += this.vitY;

        if (this.posX + this.size > width || this.posX < 0) {
            this.vitX = this.vitX * -1;
        }
        if (this.posY + this.size > height || this.posY < 0) {
            this.vitY *= -1;
        }

        stroke(this.color);
        strokeWeight(2);
        noFill();
        square(this.posX, this.posY, this.size);
        fill(this.color);
        noStroke();
        text(this.name, this.posX, this.posY - 4);
    } // fin de update

};

function setup() {
    createCanvas(400, 400);
    textFont('system-ui');
}

let chaton = Object.create(bouncy);
chaton.name = "un bon";
chaton.vitX = 1.5;
chaton.color = '#816C61'; // --clr-taupe


let machin = Object.create(bouncy);
machin.name = "fusilléééééé";
machin.vitY = -2;
machin.color = '#131B23'; // --clr-gunmetal

function draw() {
    background('#E9F1F7'); // --myColor
    bouncy.update();
    chaton.update();
    machin.update();
}