'use strict';

class PropertiesWindow extends Object {
    constructor(actor) {
        var width = 250;
        var height = actor.getHeight();
        super(0, 0, width, height);
        this.actor = actor;
    }
    
    update(deltaTime, maxX, maxY) {
        super.update(deltaTime, maxX, maxY);
        this.x = this.actor.getX() + this.actor.getWidth();
        this.y = this.actor.getY();
    }
}