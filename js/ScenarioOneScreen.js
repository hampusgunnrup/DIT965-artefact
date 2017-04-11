'use strict';

/*
 * This class demonstrates the use of the Screen class.
 *
*/
class ScenarioOneScreen extends GameScreen {
    constructor(game) {
        super(game);
        
       // var audio = new Audio("/assets/audio/Ida-voice.m4a"); 
        // audio.play();
        
        this.background.src = "img/boy-bedroom-1.png";
        this.graphics.setBlur("#000");

        this.character = this.game.mainCharacter;
        this.objects.push(this.character);
    }
    
    update(deltaTime) {
        this.character.state = this.character.stateEnum.SPEAKING;
        
        switch(this.character.state) {
            case this.character.stateEnum.WAITING:
                break;
            case this.character.stateEnum.SPEAKING:
                this.character.speak(this.game.getString("scenario1/text1"));
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