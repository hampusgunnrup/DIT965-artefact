'use strict';

/*
 * Extends the Screen class by introducing a properties window for each object on the screen.
*/
class GameScreen extends Screen {
    constructor(game) {
        super(game);
        this.Head1Y = 0;
        this.activeObject = null;
    }
    
    update(deltaTime) {
        if(this.activeObject === null)
            super.update(deltaTime);
        else
            this.touchEvents = this.game.getTouchEvents();  
        
        for(var n = 0; n < this.touchEvents.length; n++) {
            if(this.activeObject != null && !this._isWithinPropertiesWindow(this.touchEvents[n], this.activeObject)) { // If the user clicks outside of the active properties window. i == 0 means that it should only do it once(i.e. not for every object)
                this.game.setTouchEvents(this.touchEvents); // This call allows the game instance to use the old touchevents, which results in the screen checking them in the next call.
                super.update(deltaTime);
                
                /* Having these two calls after the super.update, makes sure that the same properties window isn't visible again(i.e. the user clicks the object with the active propertieswindow)*/
                this.activeObject.hideProperties();
                this.activeObject = null;
            }
            
            for(var i = 0; i < this.objects.length; i++) {
                if(this.activeObject == null)                                                       // If the screen class is not being called
                    this.objects[i].update(deltaTime, this.game.getWidth(), this.game.getHeight()); // Update all of the objects, since the Screen class is not
                if(this.objects[i].propertiesWindowVisible) {
                    this.activeObject = this.objects[i];
                    this.objects[i].setPropertyClicked(this._isPropertyClicked(this.objects[i], this.touchEvents[n]) + 1);
                }
            }
        }
    }
    
    display() {
        super.display();

        /* Since every object on a Screen that is a GameScreen has a properties windows attached, 
        it is drawn for every object on the screen.
        */
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].propertiesWindowVisible) {
                this._drawPropertiesWindow(this.objects[i].propertiesWindow, this.graphics); // Drawing the propertieswindow slows down the rendering of the game greately. Maybe take a look into this?
            }
        }
    }
    
    /*
     * Draws the passed in properties window using the passed in graphics instance.
     * The underscore before the methodname depicts that it is supposed to be a private method(javascript doesn't have private members)
    */
    _drawPropertiesWindow(propertiesWindow, graphics) {
        var width = propertiesWindow.width;
        var H1Size = graphics.getH1Size(this.game.getString("common/properties"));
        var H1X = propertiesWindow.x + width/2 - H1Size.width/2;
        var H1Y = propertiesWindow.y + H1Size.height;
        this.remove = H1Y;
        this.divide = H1Size.height + 5;
        
        if(propertiesWindow.getHeight() == 0)
            propertiesWindow.setHeight(H1Y + (H1Size.height + 5)*(propertiesWindow.actor.properties.size + 1) - propertiesWindow.y);
        
        graphics.drawRoundedSquare(propertiesWindow.x, propertiesWindow.y, propertiesWindow.width, propertiesWindow.height, "#ECE63D");
        graphics.drawH1(H1X, H1Y, this.game.getString("common/properties"));

        var x = H1X;
        var y = H1Y;

        propertiesWindow.actor.properties.forEach(function(value, key, map) {
            y += H1Size.height + 5;
            graphics.drawH2(x, y, key + ":");
            graphics.drawParagraph(x + width/2, y, value);
        });
    }
    
    /*
     * Returns the index of the property that is clicked.
     * If no property is clicked, -1 is returned.
    */
    _isPropertyClicked(object, touchEvent) {
        if(object.isPropertiesWindowVisible()) {
            var x = object.getX() + object.getWidth();
            var y = object.getY();
            var width = 210;
            var height = object.getHeight();
            var index = -1;
            
            if( // If the touch event occurs within the properties window
                touchEvent.x >= x && touchEvent.x <=x + width &&
                touchEvent.y >= y && touchEvent.y <= y + height
            ) {
                index = Math.floor((touchEvent.y - this.remove) / this.divide); // Minus one since index starts at zero
            }
            
            if(index < 0 || index >= object.getProperties().size) { // If the index is below 0 or more than the max index
                return -1;
            }

            return index;
        }
    }
    
    _isWithinPropertiesWindow(touchEvent, object) {
        if(object !== null && object !== undefined) {
            var x = object.getX() + object.getWidth();
            var y = object.getY();
            var width = 210;
            var height = object.getPropertiesWindow().getHeight();
             if( // If the touch event occurs within the properties window
                    touchEvent.x >= x && touchEvent.x <= x + width &&
                    touchEvent.y >= y && touchEvent.y <= y + height
            ) {
                return true;
            }
        }
        
        return false;
    }
    
    hideProperties() {
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].hideProperties();
        }
    }
}
