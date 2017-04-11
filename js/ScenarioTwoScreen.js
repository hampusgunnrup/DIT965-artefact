'use strict';

class ScenarioTwoScreen extends GameScreen {
    constructor(game) {
        super(game);
        
        this.background.src = "img/livingroom.png";
        
        this.character = this.game.mainCharacter;
        
        this.objects.push(this.character);
        this.file = new FileIO("/assets/text.xml");
        this.file.open(); 
           
        this.graphics.setBlur("#000");
        
    }
    
    
    update(deltaTime) {
      this.character.state = this.character.stateEnum.SPEAKING; 
        
        switch(this.character.state){
            case this.character.stateEnum.WAITING:
                break;
            case this.character.stateEnum.SPEAKING:
                this.character.speak(this.file.getUniqueNodeValue("secondText"));
                break;
            default:
            break
            
        }
         super.update(deltaTime);
    }
   
   
   display() {
       super.display();
       
       for(var j = 0; j < this.objects.length; j++){
           if(this.objects[j] instanceof Actor){
               var bubble = this.objects[j].speechBubble;
               if(bubble.isVisible()){
                   this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", bubble.getText());
               }
           }
       }
       
   }
   
   
}