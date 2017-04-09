'use strict'

class Cap extends Object {
    constructor(actor) {
        var width = actor.getWidth()/2;
        var height = actor.getHeight()/5;
        super(0, 0, width, height);
        this.actor = actor;
    }
    
    update(deltaTime, maxX, maxY) {
        super.update(deltaTime, maxX, maxY);
        this.x = this.actor.getX() + this.actor.getWidth()/2 - this.width/2;
        this.y = this.actor.getY() - 10;
    }
}