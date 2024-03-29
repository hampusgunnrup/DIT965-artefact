'use strict';

/* 
 * An Object is something that has a width, height, x value and y value. 
 * There are getters for retrieving the values and an update method.
 * Additionally, an object can contain other objects and a set of properties (in the form of a map).
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
        this.objects = new Array();  // Every object can "own" a set of objects. These gets updated by the object
        this.properties = new Map(); // This should be {"property", "value"}. e.g. {"age", "100"}
        this.propertiesWindow = new PropertiesWindow(this);
        this.propertiesWindowVisible = false;
        this.propertyClicked = -1;
        this.clickable = true;
        this.rotation = 0;
        this.shouldClick = true;
    }
    
    /*
     * This is similar to the update method in the Screen class.
     * It expects to be updated regularly. 
     * It simply limits the object from going outside of the set bounds and updates every contained object within this object.
     *
     * param deltaTime: the time that has passed between the last call and the current call.
     * param maxX: the highest x value that can be used.
     * param maxY: the highest y value that can be used.
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
        
        if(this.propertiesWindowVisible)
            this.propertiesWindow.update(deltaTime, maxX, maxY); // Update the properties windows coordinates
    }
    
    /*
     * Click handler. This gets called when the this a user clicks on this object.
     * This is an empty template. Every object that wants to handle a click event, should override this method.
     * There is no need to call the super function.
    */
    onClick() {
        if(this.clickable)
            this.propertiesWindowVisible = !this.propertiesWindowVisible;
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
    
    getBackground() {
        return this.background;
    }
    
    getObjects() {
        return this.objects;
    }
    
    isPropertiesWindowVisible() {
        return this.propertiesWindowVisible;
    }
    
    getRotation() {
        return this.rotation;
    }
    
    getProperties() {
        return this.properties;
    }
    
    getPropertyClicked() {
        return this.propertyClicked;
    }
    
    getPropertiesWindow() {
        return this.propertiesWindow;
    }
    
    
    /* Setters */
    setX(x) {
        this.x = x;
    }
    
    setY(y) {
        this.y = y;
    }
    
    setWidth(width) {
        this.width = width;
    }
    
    setHeight(height) {
        this.height = height;
    }
    
    setClickable(clickable) {
        this.clickable = clickable;
    }
    
    setRotation(rotation) {
        this.rotation = rotation;
    }
    
    setPropertyClicked(index) {
        this.propertyClicked = index;
    }
    
    /*
     * The background for the object can be an image or simply a color.
     * Every Screen class will automatically draw the background of all the objects that are added.
     * If the background is not specified, it will not be drawn.
     * param image: expects a javascript image(new Image()) with the src attached or a hexadecimal colorcode.
    */
    setBackground(background) {
        this.background = background;
    }
    
    /*
     * Add an object to this object.
     * param object: must be of type Object. 
     * note: Optionally, assure that the object contains a function w
     ith the signature update(deltaTime, maxX, maxY)
    */
    addObject(object) {
        this.objects.push(object);
    }
    
    
    /*
     * Removes the passed in object from the objects contained in this object.
     * param object: must be of type Object or an integer number(index).
    */
    removeObject(remove) {
        var index = -1;
        
        if(remove instanceof Object) {
            index = this.objects.indexOf(remove); // Find the index of the object
        } else {                                  // If it is an integer number
            index = remove;
        }
        
        if(index >= 0) {
            this.objects.splice(index, 1);
        }
    }
    
    /*
     * Add a property.
     * param property: must be a string of characters
     * param value: must be a string of characters
    */
    addProperty(property, value) {
        this.properties.set(property, value);
    }
    
    
    /*addFunction(method) {
        this.properties.set(method); // This is bad practice. It should have key and value. Besides, why not just use the addProperty method?
    }*/
    
    /*
     * Removes the passed in property from this elements set of properties.
     * param property: must be a string of characters
    */
    removeProperty(property) {
        this.properties.delete(property);
    }
    
    changeProperty(property, value) {
        this.properties[property] = value;
    }
    
    hideProperties() {
        if(this.clickable && this.propertiesWindowVisible)
            this.propertiesWindowVisible = false;
    }
    
    _isWithinPropertiesWindow(touchEvent, object) {
        var x = object.getX() + object.getWidth();
        var y = object.getY();
        var width = 210;
        var height = object.getHeight();
         if( // If the touch event occurs within the properties window
                touchEvent.x >= x && touchEvent.x <=x + width &&
                touchEvent.y >= y && touchEvent.y <= y + height
        ) {
            return true;
        }
        
        return false;
    }
}
