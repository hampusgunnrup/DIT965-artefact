'use strict'

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
    }
    
    /*
     * This method should always be called before the display method in the main game loop.
     * param deltaTime: the time that has passed between the last call and the current call.
    */
    update(deltaTime) {
        var touchEvents = this.game.getTouchEvents();
        /* Update all of the objects that are contained in the screen */
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(deltaTime, this.game.getWidth(), this.game.getHeight());
           
            /* Check the touch events*/
            for(var n = 0; n < touchEvents.length; n++) {
                if(
                    touchEvents[n].x >= this.objects[i].getX() && touchEvents[n].x <= this.objects[i].getX() + this.objects[i].getWidth() &&
                    touchEvents[n].y >= this.objects[i].getY() && touchEvents[n].y <= this.objects[i].getY() + this.objects[i].getHeight()
                ) {
                    this.objects[i].onClick();
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
        for(var i = 0; i < this.objects.length; i++) {                                                                                                      // For all objects
            var current = this.objects[i];
            var currentO = current.getObjects();                                                                                                            // The current object's objects
            
            this.graphics.drawElement(current.getX(), current.getY(), current.getWidth(), current.getHeight(), current.getBackground());                         // Draw the object  
            
            for(var n = 0; n < currentO.length; n++) {
                this.graphics.drawElement(currentO[n].getX(), currentO[n].getY(), currentO[n].getWidth(), currentO[n].getHeight(), currentO[n].getBackground()); // Draw the object's object(s)
            }
        }
    }
}