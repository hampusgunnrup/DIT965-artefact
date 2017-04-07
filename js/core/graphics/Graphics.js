'use strict'

/*
 * A class for handling the low level graphics.
 * It contains functions for clearing the screen, drawing a background and drawing an image/element.
*/
class Graphics {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.context = this.canvas.get2DContext();
        this.width = width;
        this.height = height;
    }
    
    clearScreen() {
        this.context.clearRect(0,0,this.width,this.height);
    }
    
    drawBackground(image) {
        this.context.drawImage(image, 0, 0, this.width, this.height);
    }
    
    drawElement(x, y, width, height, background) {
        if(background != undefined) {
            if(background instanceof Image) {
                this.context.drawImage(background, x, y, width, height);
            } else {
                this.context.fillStyle = background;
                this.context.fillRect(x, y, width, height);
            }
        }
    }
    
    drawRoundedSquare(x, y, width, height, color) {
        this.context.beginPath();
        this.context.moveTo(20, 10);
        this.context.lineTo(80, 10);
        this.context.quadraticCurveTo(90, 10, 90, 20);
        this.context.lineTo(90, 80);
        this.context.quadraticCurveTo(90, 90, 80, 90);
        this.context.lineTo(20, 90);
        this.context.quadraticCurveTo(10, 90, 10, 80);
        this.context.lineTo(10, 20);
        this.context.quadraticCurveTo(10, 10, 20, 10);
        this.context.strokeStyle = color;
        this.context.stroke();
    }
    
    drawText(x, y, size, text, color) {
        this.context.fillStyle = color;
        this.context.font = size + "em " + "Courier New";
        this.context.fillText(text, x, y);
    }
    
    drawLine(fromX, fromY, toX, toY, color) {
        this.context.beginPath();
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.strokeStyle = color;
        this.context.stroke();
    }
    
    drawH1(x, y, text) {
        this.drawText(x, y, 2, text, "#000");
        
        var textWidth = this.context.measureText(text).width;
        this.drawLine(x, y + 2, x + textWidth, y + 2);
    }

    getH1Size(text) {
        this.context.font = "2em Courier New";
        var size = {
            width: this.context.measureText(text).width, 
            height: this.context.measureText("M").width + 2 // The closest you can get to height
        };
    
        return size;    
    }
    
    drawH2(x, y, text) {
        this.drawText(x, y, 1.2, text, "#000");
    }
    
    drawParagraph(x, y, text) {
        this.drawText(x, y, 1, text, "#222");
    }
}
