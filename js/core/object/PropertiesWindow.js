'use strict';

class PropertiesWindow {
    constructor(actor) {
        var width = 210;
        var height = actor.getHeight();
        this.x = actor.getX() + actor.getWidth();
        this.y = actor.getY();
        this.width = width;
        this.height = height;
        this.actor = actor;
    }
    
    update(deltaTime, maxX, maxY) {
        this.x = this.actor.getX() + 20;
        this.y = this.actor.getY();
        
        if(this.x + this.width > maxX) {
            this.x = maxX - this.width;
        }
        
        if(this.x < 0) {
            this.x = 0;
        }
        
        if(this.y + this.height > maxY) {
            this.y = maxY - this.height;
        }
        
        if(this.y < 0) {
            this.y = 0;
        }
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