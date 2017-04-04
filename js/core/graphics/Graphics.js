'use strict'

class Graphics {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.context = this.canvas.get2DContext();
        this.width = width;
        this.height = height;
    }
    
    drawBackground(image) {
        this.context.drawImage(image, 0, 0, this.width, this.height);
    }
    
    clearScreen() {
        this.context.clearRect(0,0,this.width,this.height);
    }
    
    drawElement(x,y,width,height,image) {
        this.context.drawImage(image, x, y, width, height);
    }
}
