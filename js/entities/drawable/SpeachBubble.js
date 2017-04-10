'use strict';

class SpeachBubble extends Object {
    constructor(actor) {
        var width = 220;
        var height = 200;
        super(0, 0, width, height);
        this.actor = actor;
        this.text = "";
    }
    
    update(deltaTime, maxX, maxY) {
        super.update(deltaTime, maxX, maxY);
        this.x = this.actor.getX() + this.actor.getWidth() - 20;
        this.y = this.actor.getY() - this.height - 20;
    }
}