'use strict'

class Canvas {
    constructor(htmlCanvas) {
        this.htmlCanvas = htmlCanvas;
        this.width = this.htmlCanvas.getAttribute("width");
        this.height = this.htmlCanvas.getAttribute("height");
    }
    
    get2DContext() {
        return this.htmlCanvas.getContext("2d");
    }
    
    getWidth() {
        return this.width;
    }
    
    getHeight() {
        return this.height;
    }
}