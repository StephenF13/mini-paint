'use strict';

var Program = function () {
    this.pen = new Pen();
    // composition, l'ardoise a une dependance forte du crayon
    this.canvas = new Slate(this.pen);
    this.palette = new Palette(this.pen);
};

Program.prototype.onClickColor = function (event) {
    this.pen.setColor($(event.target).data('color'));
};

Program.prototype.onClickColorPicker = function (event) {
    $('#palette').toggle('fast');
};

Program.prototype.onClickShape = function (event) {
    this.pen.setShape($(event.target).data('shape'));
};

Program.prototype.onClickSize = function (event) {
    this.pen.setSize($(event.target).val());
};

Program.prototype.onClickToolEraser = function () {
    this.canvas.clear();
};


// Méthode appelée au démarrage de l'application
Program.prototype.start = function () {
    $('#size').val(2);
    // Installation des gestionnaires d'évènements des outils
    $('#tool-color-picker').on('click', this.onClickColorPicker.bind(this));
    $('#tool-eraser').on('click', this.onClickToolEraser.bind(this));
    // Installation des gestionnaires d'évènements de configuration du crayon
    $('.color').on('click', this.onClickColor.bind(this));
    $('#size').on('change', this.onClickSize.bind(this));
    // Création d'un évènement spécifique à l'application
    $('.shape').on('click', this.onClickShape.bind(this));
};