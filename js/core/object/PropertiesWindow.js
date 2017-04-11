'use strict';

class PropertiesWindow {
    constructor(actor) {
        var width = 250;
        var height = actor.getHeight();
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.actor = actor;
    }
    
    update(deltaTime, maxX, maxY) {
        this.x = this.actor.getX() + this.actor.getWidth();
        this.y = this.actor.getY();
    }
    
    
    /* Getters */
    getX() {
        return this.x;
    }
    
    getY() {
        return this.y;
    }
    
    getWidth() {
        return this.width;
    }
    
    getHeight() {
        return this.height;
    }
}