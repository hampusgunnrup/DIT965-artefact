'use strict';

/*
 * This class demonstrates the use of the Screen class.
 *
*/
class ScenarioOneScreen extends GameScreen {
    constructor(game) {
        super(game);
                
        this.background.src = "img/boy-bedroom-1.png";                                                               // This image might be used for one of the scenarios in the game
        this.graphics.setBlur("#000");

        this.character = this.game.mainCharacter;
        
        this.objects.push(this.character);
        this.file = new FileIO("/assets/text.xml");
        this.file.open();
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
        
        /* For every actor on the screen, draw their speech bubble(if it is visible). */
        /* All actors should have a speech bubble */
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i] instanceof Actor) {
                var bubble = this.objects[i].speechBubble;
                if(bubble.isVisible()) {
                    this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", bubble.getText());
                }
            }
        }
    }
}