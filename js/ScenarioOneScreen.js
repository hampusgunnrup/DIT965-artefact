'use strict';

/*
 * This class demonstrates the use of the Screen class.
 *
*/
class ScenarioOneScreen extends GameScreen {
    constructor(game) {
        super(game);
                
        this.background.src = "img/boy-bedroom-1.png";                                                                  // This image might be used for one of the scenarios in the game

        this.element1 = new Image();
        this.element1.src = "http://clipartix.com/wp-content/uploads/2016/05/Clip-art-stick-figure-clipart-image.jpeg"; // Tmp test image
        
        var x = 20;
        var y = this.game.getHeight() - 250 - 20;
        this.character = new MainCharacter(x, y, 100, 250);
        this.character.setBackground(this.element1);
        
        this.objects.push(this.character);
        this.file = new FileIO("/assets/text.xml");
        this.file.open();
        
        this.graphics.setBlur("#000");
    }
    
    update(deltaTime) {
        
        this.character.state = this.character.stateEnum.SPEAKING;
        
        switch(this.character.state) {
            case this.character.stateEnum.WAITING:
                break;
            case this.character.stateEnum.SPEAKING:
                this.character.speak(this.file.getUniqueNodeValue("firstText"));
                break;
            default:
                break;
        }
        
        super.update(deltaTime);
    }
    
    display() {
        super.display();
        
        /* For every actor on the screen, draw their speach bubble(if it is visible). */
        /* All actors should have a speach bubble */
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i] instanceof Actor) {
                var bubble = this.objects[i].speachBubble;
                if(bubble.isVisible()) {
                    this.graphics.drawSpeachBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", bubble.getText());
                }
            }
        }
    }
}