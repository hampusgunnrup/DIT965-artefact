'use strict';

class SpeachBubble extends Object {
    constructor(actor) {
        var width = 200;
        var height = 100
        super(0, 0, width, height);
        this.actor = actor;
    }
    
    update(deltaTime, maxX, maxY) {
        super.update(deltaTime, maxX, maxY);
        this.x = this.actor.getX() + this.actor.getWidth() - 20;
        this.y = this.actor.getY() - this.height - 20;
    }
}