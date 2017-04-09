'use strict'

/*
 * Extends the Screen class by introducing a properties window for each object on the screen.
*/
class GameScreen extends Screen {
    update(deltaTime) {
        super.update(deltaTime);
    }
    
    display() {
        super.display();

        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].propertiesWindowVisible) {
                this.drawPropertiesWindow(this.objects[i].propertiesWindow, this.graphics);
            }
        }
    }
    
    drawPropertiesWindow(propertiesWindow, graphics) {
        graphics.drawRoundedSquare(propertiesWindow.x, propertiesWindow.y, propertiesWindow.width, propertiesWindow.height, "#ECE63D");
        
        var width = propertiesWindow.width;
        var H1Size = graphics.getH1Size("Properties");
        var H1X = propertiesWindow.x + width/2 - H1Size.width/2;
        var H1Y = propertiesWindow.y + H1Size.height;
        
        graphics.drawH1(H1X, H1Y, "Properties");

        var x = H1X;
        var y = H1Y;
        propertiesWindow.actor.properties.forEach(function(value, key, map) {
            y += H1Size.height + 5;
            graphics.drawH2(x, y, key + ":");
            graphics.drawParagraph(x + width/2, y, value);
        });
    }
}
