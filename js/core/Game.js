'use strict'

/* This class acts as an intermediary in many cases. It represents the game as a whole.*/
class Game {
    constructor(canvas) {
        this.width = canvas.getWidth();
        this.height = canvas.getHeight();
        this.graphics = new Graphics(canvas, this.width, this.height);
    }
    
    /* Getters */
    getGraphics() {
        return this.graphics;
    }
    
    getCurrentScreen() {
        return this.screen;
    }
    
    getWidth() {
        return this.width;
    }
    
    getHeight() {
        return this.height;
    }
    
    
    /* Setters */
    setScreen(screen) {
        this.screen = screen;
    }
}