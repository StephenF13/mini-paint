'use strict';

var Pen = function () {
    this.color = 'black';
    this.size = 2;
};

Pen.prototype.setColor = function (color) {
    this.color = color;
};

Pen.prototype.setColorRgb = function (red, green, blue) {
    this.color = 'rgb(' + red + ', ' + green +
        ', ' + blue + ')';
};

Pen.prototype.setShape = function (shape) {
    this.shape = shape;
};

Pen.prototype.setSize = function (size) {
    this.size = size;
};
