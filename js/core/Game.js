'use strict';

/* This class acts as an intermediary in many cases. It represents the game as a whole.*/
class Game {
    constructor(canvas) {
        /* The size is based on one of the computers used to test the game */
        this.width = 1000;
        this.height = 700;
        this.scaleX = canvas.width / this.width;//window.innerWidth / this.width;
        this.scaleY = canvas.height / this.height;//window.innerHeight / this.height;
        this.graphics = new Graphics(canvas, this.width, this.height);
        this.graphics.setScale(this.scaleX, this.scaleY);
        
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
        var touchEvents;
        touchEvents = this.input.getTouchEvents();
        return touchEvents;
    }
    
    isTouchDown() {
        return this.input.isTouchDown();
    }
    
    
    /* Setters */
    setScreen(screen) {
        this.screen = screen;
    }
    
    setTouchEvents(touchEvents) {
        this.touchEvents = touchEvents;
    }
}
