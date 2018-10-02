'use strict';

var Slate = function (pen) {
    this.canvas = document.getElementById('canvas'); // recuperation du <canvas>
    this.context = this.canvas.getContext('2d');    // recuperation du contexte
    this.pen = pen;
    this.pen.shape = 'ligne';
    this.draw = false;

    // gestionnaire d'evenement
    this.canvas.addEventListener('mousedown', this.onCanvasMouseDown.bind(this));
    this.canvas.addEventListener('mousemove', this.onCanvasMouseMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onCanvasMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.onCanvasMouseLeave.bind(this));
    // empecher affichage du menu contextuel
    window.addEventListener('contextmenu', function (e) { // Not compatible with IE < 9
        e.preventDefault();
    }, false);
};

Slate.prototype.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Slate.prototype.onCanvasMouseDown = function (event) {
    this.draw = true;
    this.rect = this.canvas.getBoundingClientRect(); // recuperer les coordonnées du canvas
    this.x = event.clientX - this.rect.left;
    this.y = event.clientY - this.rect.top;
    this.context.beginPath();
    // couleur du crayon et largeur
    this.context.strokeStyle = this.pen.color;
    this.context.lineWidth = this.pen.size;
};


Slate.prototype.onCanvasMouseLeave = function () {
    this.draw = false;
};

Slate.prototype.onCanvasMouseMove = function (event) {


    if (this.draw) {
        if (this.pen.shape === 'ligne') {
            this.x = event.clientX - this.rect.left;
            this.y = event.clientY - this.rect.top;
            this.context.lineTo(this.x, this.y);
            this.context.lineJoin = "round";
            this.context.stroke();
        }
    }
};


// Tests avec images et formes, if à retirer ou optimiser par la suite
Slate.prototype.onCanvasMouseUp = function (event) {
    this.draw = false;

    if (this.pen.shape === 'rectangle') {
        this.rect = this.canvas.getBoundingClientRect(); // recuperer les coordonnées du canvas
        this.w = event.clientX - this.rect.left;
        this.h = event.clientY - this.rect.top;
        if (event.button === 0) {
            this.context.strokeRect(this.x, this.y, this.w - this.x, this.h - this.y);
        }
        if (event.button === 2) {
            this.context.fillStyle = this.pen.color;
            this.context.fillRect(this.x, this.y, this.w - this.x, this.h - this.y);
        }
    }

    if (this.pen.shape === 'rond') {
        this.w = event.clientX - this.rect.left;
        this.h = event.clientY - this.rect.top;
        var a = (this.w - this.x) * (this.w - this.x);
        var b = (this.h - this.y) * (this.h - this.y);
        this.context.arc(this.x, this.y, Math.sqrt(a + b), 0, 2 * Math.PI);

        if (event.button === 0) {
            this.context.stroke();
        }

        if (event.button === 2) {
            this.context.fillStyle = this.pen.color;
            this.context.fill();
        }
    }

    if (this.pen.shape === 'smiley') {
        this.rect = this.canvas.getBoundingClientRect(); // recuperer les coordonnées du canvas
        this.w = event.clientX - this.rect.left;
        this.h = event.clientY - this.rect.top;
        this.context.arc(this.w, this.h, 50, 0, Math.PI * 2, true); // Outer circle
        this.context.moveTo(this.w + 35, this.h);
        this.context.arc(this.w, this.h, 35, 0, Math.PI, false); // Mouth (clockwise)
        this.context.moveTo(this.w - 10, this.h - 10);
        this.context.arc(this.w - 15, this.h - 10, 5, 0, Math.PI * 2, true); // Left eye
        this.context.moveTo(this.w + 20, this.h - 10);
        this.context.arc(this.w + 15, this.h - 10, 5, 0, Math.PI * 2, true); // Right eye
        this.context.stroke();
    }

    if (this.pen.shape === 'star') {
        this.rect = this.canvas.getBoundingClientRect(); // recuperer les coordonnées du canvas
        this.w = event.clientX - this.rect.left;
        this.h = event.clientY - this.rect.top;

        var length = 15;
        this.context.save();
        this.context.translate(this.w, this.h);
        this.context.beginPath();
        for (var i = 5; i--;) {
            this.context.lineTo(0, length);
            this.context.translate(0, length);
            this.context.rotate((Math.PI * 2 / 10));
            this.context.lineTo(0, -length);
            this.context.translate(0, -length);
            this.context.rotate(-(Math.PI * 6 / 10));
        }
        this.context.lineTo(0, length);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }

    if (this.pen.shape === 'soleil') {
        this.rect = this.canvas.getBoundingClientRect(); // recuperer les coordonnées du canvas
        this.image = document.getElementById("soleil");
        this.w = event.clientX - this.rect.left;
        this.h = event.clientY - this.rect.top;
        this.context.drawImage(this.image, this.w - 50, this.h - 50, 100, 100);

    }

    if (this.pen.shape === 'nuage') {
        this.rect = this.canvas.getBoundingClientRect(); // recuperer les coordonnées du canvas
        this.w = event.clientX - this.rect.left;
        this.h = event.clientY - this.rect.top;
        this.image = document.getElementById("nuage");
        this.context.drawImage(this.image, this.w - 50, this.h - 50, 100, 100);
    }
};


