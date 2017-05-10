'use strict';

class SpeechBubble extends Object {
    constructor(actor) {
        var width = 100;
        var height = 100;
        super(0, 0, width, height);
        this.actor = actor;
        this.text = "";
        this.visible = true;
    }
    
    update(deltaTime, maxX, maxY) {
        super.update(deltaTime, maxX, maxY);
        this.x = this.actor.getX() + this.actor.getWidth() - 20;
        this.y = this.actor.getY() - this.height - 20;
    }
    
    hide() {
        this.visible = false;
    }
    
    show() {
        this.visible = true;
    }
    
    isVisible() {
        return this.visible;
    }
    
    setText(text) {
        this.text = text;
    }
    
    getText() {
        return this.text;
    }
}