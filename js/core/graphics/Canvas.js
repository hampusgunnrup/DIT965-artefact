'use strict'

/*
 * This class represents and handles the html canvas, which is used as a drawing platform.
*/
class Canvas {
    /*
     * param htmlCanvas: expects a reference to an html canvas element. For example, retrieved from document.getElementById("canvas"). 
     * note: see HTMLCanvasElement
    */
    constructor(htmlCanvas) {
        this.htmlCanvas = htmlCanvas;
        this.width = this.htmlCanvas.getAttribute("width");
        this.height = this.htmlCanvas.getAttribute("height");
    }
    
    
    /* Getters */
    /*
     * Returns the 2d context from the canvas(see CanvasRenderingContext2D). This can be used to draw methods.
    */
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