'use strict';

/* 
 * The screen class is a base class for more specific screen classes.
 * All other screen classes should extend this class.
 *
*/
class Screen {
    /*
     * The standard constructor.
     * It initializes two variables for holding the game and graphics instances.
     * param game: the active game instance.
    */
    constructor(game) {
        this.game = game;
        this.graphics = game.getGraphics();
        this.background = new Image();
        this.objects = new Array();
        this.touchEvents = new Array();
        this.activeObject = null;
    }
    
    /*
     * This method should always be called before the display method in the main game loop.
     * param deltaTime: the time that has passed between the last call and the current call.
    */
    update(deltaTime) {
        this.touchEvents = [];
        this.touchEvents = this.game.getTouchEvents();

       
        /* Update all of the objects that are contained in the screen */
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(deltaTime, this.game.getWidth(), this.game.getHeight());
        
            /* Check the touch events*/
            for(var n = 0; n < this.touchEvents.length; n++) {
                if(i == 0 && this.activeObject !== null && !this._isWithinPropertiesWindow(this.touchEvents[n], this.activeObject)) { // If the user clicks outside of the active properties window. i == 0 means that it should only do it once(i.e. not for every object)
                    this.activeObject.hideProperties();
                    this.activeObject = null;
                }
                
        
                if(
                    this.touchEvents[n].x >= this.objects[i].getX() && this.touchEvents[n].x <= this.objects[i].getX() + this.objects[i].getWidth() &&
                    this.touchEvents[n].y >= this.objects[i].getY() && this.touchEvents[n].y <= this.objects[i].getY() + this.objects[i].getHeight()
                ) {
                    if(this.activeObject === null) {
                        this.objects[i].onClick(this.touchEvents[n]);
                        this.activeObject = this.objects[i]; // The object that has been clicked
                    }
                }
            }
        }
    }
    
    /*
     * This method should be called after the update method in the main game loop.
    */
    display() {
        /* A standard display pattern. Clear the screen -> draw the background -> draw the elements.  */
        this.graphics.clearScreen();
        this.graphics.drawBackground(this.background);
        
        /* Draw all objects contained on the screen(and the objects' objects) */
        for(var i = 0; i < this.objects.length; i++) {                                                                                                               // For all objects
            var current = this.objects[i];
            var currentO = current.getObjects();                                                                                                                     // The current object's objects
            
            if(current.getBackground() != undefined) {
                this.graphics.drawElement(current.getX(), current.getY(), current.getWidth(), current.getHeight(), current.getBackground(), current.getRotation());                         // Draw the object  
            }
            
            for(var n = 0; n < currentO.length; n++) {
                if(currentO[n].getBackground() != undefined) {
                    this.graphics.drawElement(currentO[n].getX(), currentO[n].getY(), currentO[n].getWidth(), currentO[n].getHeight(), currentO[n].getBackground()); // Draw the object's object(s)
                }
            }
        }
    }
    
    /*
     * param object: must be of type Object. 
     * note: Optionally, assure that the object contains a function with the signature update(deltaTime, maxX, maxY)
    */
    addObject(object) {
        this.objects.push(object);
    }
    
        /*
     * Removes the passed in object from the objects contained in this screen.
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
    
    _isWithinPropertiesWindow(touchEvent, object) {
        if(object !== null && object !== undefined) {
            var x = object.getX() + object.getWidth();
            var y = object.getY();
            var width = 210;
            var height = object.getHeight();
             if( // If the touch event occurs within the properties window
                    touchEvent.x >= x && touchEvent.x <= x + width &&
                    touchEvent.y >= y && touchEvent.y <= y + height
            ) {
                return true;
            }
        }
        
        return false;
    }
}