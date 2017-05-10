'use strict';

class ClassWindow extends Object{
    constructor(x, y, width, height, name) {
        super(x, y, width, height);
        this.name = name;
    }
    
    getName() {
        return this.name;
    }
}