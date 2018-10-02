'use strict';

var Palette = function (pen) {
    this.canvas = document.getElementById('palette'); // recuperation du <canvas>
    this.context = this.canvas.getContext('2d');    // recuperation du contexte
    this.pen = pen;
    this.pickedColor = {
        red: 0,
        green: 0,
        blue: 0
    };

    this.canvas.addEventListener('click', this.onClickPalette.bind(this));

    this.build();
};

Palette.prototype.build = function () {
    var gradient = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
    // Create color gradient
    gradient.addColorStop(0, "rgb(255,   0,   0)");
    gradient.addColorStop(0.15, "rgb(255,   0, 255)");
    gradient.addColorStop(0.33, "rgb(0,     0, 255)");
    gradient.addColorStop(0.49, "rgb(0,   255, 255)");
    gradient.addColorStop(0.67, "rgb(0,   255,   0)");
    gradient.addColorStop(0.84, "rgb(255, 255,   0)");
    gradient.addColorStop(1, "rgb(255,   0,   0)");
    // Apply gradient to canvas
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

    // Create semi transparent gradient (white -> trans. -> black)
    gradient = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
    gradient.addColorStop(0.5, "rgba(0,     0,   0, 0)");
    gradient.addColorStop(1, "rgba(0,     0,   0, 1)");
    // Apply gradient to canvas
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};

Palette.prototype.onClickPalette = function (event) {
    this.rect = this.canvas.getBoundingClientRect();
    this.x = event.clientX - this.rect.left;
    this.y = event.clientY - this.rect.top;

    this.palette = this.context.getImageData(this.x, this.y, 1, 1);
    this.pickedColor.red = this.palette.data[0];
    this.pickedColor.green = this.palette.data[1];
    this.pickedColor.blue = this.palette.data[2];

    this.pen.setColorRgb(this.pickedColor.red, this.pickedColor.green, this.pickedColor.blue);
};
