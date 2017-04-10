'use strict';

class Button extends Object {
    constructor(x, y, width, height, text, func) {
        super(x, y, width, height);
        this.setBackground("#FFF");
        this.text = text;
        this.func = func;
    }
    
    getText() {
        return this.text;
    }
    
    setText(text) {
        this.text = text;
    }
    
    onClick() {
        super.onClick();
        this.func(this);
    }
}