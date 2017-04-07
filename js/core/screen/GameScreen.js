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
                this.objects[i].propertiesWindow.draw(this.graphics);
            }
        }
    }
}
