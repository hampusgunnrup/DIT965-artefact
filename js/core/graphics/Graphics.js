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
    
    drawElement(x, y, width, height, image) {
        this.context.drawImage(image, x, y, width, height);
    }
}
