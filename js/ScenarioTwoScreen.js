'use strict';

class ScenarioTwoScreen extends GameScreen {
    constructor(game) {
        super(game);
        
        this.graphics.setBlur("#000");
        this.background.src = "img/Living-room.png";
        
        this.character = this.game.mainCharacter;
        this.character.walkRight(20);
        this.game.mainCharacter.walkUp(100);
        
      this.addObject(this.character);

  
        
        this.game.arrow.setX(500);
        this.game.arrow.setY(20);
        this.objects.push(this.game.arrow);
        this.arrowVisible = true; 
        
        this.states = {
            TASKONE : "TASKONE",
            TASKDONE : "TASKDONE",
            
        };
        this.state = this.states.TASKONE;
        
        this.change = 5;
        
        var object1 = new Image();
        object1.src = "img/oldman.svg";
        var grandpa = new Actor(400, 360, 180, 300 );
        grandpa.setBackground(object1);
        
        grandpa.addProperty("Name", "Grandpa");
        grandpa.addProperty("Age", "65");
        grandpa.addProperty("Hair Color", "  Black");
        grandpa.addProperty("Mood", "surprised");
        this.addObject(grandpa);
        
        var object2 = new Image();
        object2.src = "img/Dad.svg";
        var dad = new Actor(600, 360, 180, 300 );
        dad.setBackground(object2);
        
        dad.addProperty("Name", "Dad");
        dad.addProperty("Age", "45");
        dad.addProperty("Hair Color", "  Brown");
        dad.addProperty("Mood", "Sleepy");
        this.addObject(dad);
        
        var object3 = new Image();
        object3.src = "img/mom.svg";
        var mom = new Actor(200, 360, 180, 300 );
        mom.setBackground(object3);
        
        mom.addProperty("Name", "Mom");
        mom.addProperty("Age", "38");
        mom.addProperty("Hair Color", "  Red");
        mom.addProperty("Mood", "Happy");
        this.addObject(mom);
        
        
          this.game.taskWindow.addTask(this.game.getString("scenario2/task1"), "/assets/audio/tmp1.wav");
          


    }
    
    
   
    update(deltaTime) {
      // this.character.state = this.character.stateEnum.SPEAKING; 
        
        switch (this.state) {
            case this.states.TASKONE:
                this.animateArrow(false); 
                if (this.game.taskWindow.isPlaying) {
                    this.state = this.states.TASKONE;
                    this.change = -5; 
                    
   //   while(this.state = this.states.TASKON){
         var objectCap = new Image();
        objectCap.src = "img/Hat-green.png";
        var cap = new Actor(90, 360, 90, 120);
        cap.setBackground(objectCap);
        this.addObject(cap);
   // }
                } break;
            
        this.animateArrow(true);
                break;
            case this.states.TASKDONE:
                this.animateHideArrow();
                break;
            default:
            //?    break;
            
        }
        
    /*    switch(this.character.state){
           case this.character.stateEnum.WAITING:
                break;
            case this.character.stateEnum.SPEAKING:
                this.character.speak(this.game.getString("scenario2/text1"));
                break;
            default:
            break; */
            super.update(deltaTime);
        }
   
    display() {
        super.display();
        
        var bubble = this.character.speechBubble;
        if(bubble.isVisible()){
            this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", bubble.getText());
        }
    }
    
     animateArrow(stay) {
        var currentWidth = this.game.arrow.getWidth();
        var currentHeight = this.game.arrow.getHeight();
        var x = this.game.arrow.getX();

        if(currentWidth > 300 || currentWidth < 200)
            this.change = -this.change;
            
        this.game.arrow.setWidth(currentWidth + this.change);
        
        if(stay)
            this.game.arrow.setX(x - this.change/2);
         
     }
     
      animateHideArrow() {
        var currentWidth = this.game.arrow.getWidth();
        var currentHeight = this.game.arrow.getHeight();
        
        if(currentWidth > 0) {
            this.game.arrow.setWidth(currentWidth + this.change);
            this.game.arrow.setHeight(currentHeight + this.change);
        } else {
            this.removeObject(this.game.arrow);
        }
    } 
    
        checkPropertiesClicked() {
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].isPropertiesWindowVisible()) {
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