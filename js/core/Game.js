'use strict';

/* This class acts as an intermediary in many cases. It represents the game as a whole.*/
class Game {
    constructor(canvas) {
        /* The size is based on one of the computers used to test the game */
        this.width = 1000;//canvas.getWidth();
        this.height = 700;//canvas.getHeight();
        this.graphics = new Graphics(canvas, canvas.getWidth(), canvas.getHeight());
        
        this.input = new Input(canvas.getHtmlCanvas(), this.scaleX, this.scaleY);
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
    
    getTouchEvents() {
        return this.input.getTouchEvents();
    }
    
    isTouchDown() {
        return this.input.isTouchDown();
    }
    
    
    /* Setters */
    setScreen(screen) {
        this.screen = screen;
    }
}
