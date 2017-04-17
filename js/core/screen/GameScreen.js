'use strict';

/*
 * Extends the Screen class by introducing a properties window for each object on the screen.
*/
class GameScreen extends Screen {
    constructor(game) {
        super(game);
        this.Head1Y = 0;
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        
        for(var n = 0; n < this.touchEvents.length; n++) {
            for(var i = 0; i < this.objects.length; i++) {
                if(this.objects[i].propertiesWindowVisible) {
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
        graphics.drawRoundedSquare(propertiesWindow.x, propertiesWindow.y, propertiesWindow.width, propertiesWindow.height, "#ECE63D");
        
        var width = propertiesWindow.width;
        var H1Size = graphics.getH1Size("Properties");
        var H1X = propertiesWindow.x + width/2 - H1Size.width/2;
        var H1Y = propertiesWindow.y + H1Size.height;
        this.remove = H1Y;
        this.divide = H1Size.height + 5;
        
        graphics.drawH1(H1X, H1Y, "Properties");

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
}
