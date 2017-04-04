'use strict'

/* 
 * An Object is something that has a width and a height. 
 * Additionally, it has an x and y value. 
*/
class Object {
    /*
     * The standard constructor.
     * param x: the starting x value of the cordinate(top left corner of the object)
     * param y: the starting y value of the coordinate(top left corner of the object)
     * param width: the width of the object
     * param height: the height of the object
     * note: in html canvas, the coordinate systems y-axis goes downwards instead of upwards.
    */
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.objects = new Array();
    }
    
    /*
     * This is similar to the update method in the Screen class.
     * It expects to be updated regularly.
    */
    update(deltaTime, maxX, maxY) {
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
        
        /* Update the Objects contained within this Object */
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(deltaTime, maxX, maxY);
        }
    }
    
    /*
     * Click handler. This gets called when the this a user clicks on this object.
    */
    onClick() {
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
    
    getImage() {
        return this.image;
    }
    
    getObjects() {
        return this.objects;
    }
    
    
    /* Setters */
    /*
     * param image: expects a javascript image(new Image()) with the src attached
    */
    setImage(image) {
        this.image = image;
    }
    
    /*
     * param property: must be of type Object. 
     * note: Optionally, assure that the property contains a function with the signature update(deltaTime, maxX, maxY)
    */
    addObject(object) {
        this.objects.push(object);
    }
}