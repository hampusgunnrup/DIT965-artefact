'use strict';

class ScenarioThreeScreen extends GameScreen {
    constructor(game) {
        super(game);
        
        this.graphics.setBlur("#000");
        this.background.src = "img/Zoo.png";
        
        this.character = this.game.mainCharacter;

        this.objects.push(this.character);
        
        
        var object1 = new Image();     
        object1.src = "img/Crocodile.svg";
        var crocodile = new Actor(380, 200, 120, 200);
        crocodile.setBackground(object1);
       
        crocodile.addProperty("Name", "Crocodile");
        crocodile.addProperty("Skin Color", "Green");
        crocodile.addProperty("Has Fur", "No");
        crocodile.addProperty("Sound", "Nom Nom Nom");
        crocodile.addProperty("Mood", "confused");
        this.addObject(crocodile);
        
        var object2 = new Image();   
        object2.src = "img/monkey2.svg";
        var monkey = new Actor(230, 450, 140, 250 );
        monkey.setBackground(object2);
        
        monkey.addProperty("Name", "monkey");
        monkey.addProperty("Skin Color", "brown");
        monkey.addProperty("Has Fur", "Yes");
        monkey.addProperty("Sound", "III ÖÖÖ AAAA");
        monkey.addProperty("Mood", "shy");
        this.addObject(monkey);
        
        var object3 = new Image();
        object3.src = "img/parrot.svg";
        var parrot = new Actor(150, 300, 80, 140 );
        parrot.setBackground(object3);
        
        parrot.addProperty("Name", "Parrot");
        parrot.addProperty("Skin Color", "Green and Red");
        parrot.addProperty("Has Fur", "No");
        parrot.addProperty("Sound", "kokokoko");
        parrot.addProperty("Mood", "scared");
        this.addObject(parrot);
        
        var object4 = new Image();
        object4.src = "img/Tiger.svg";
        var tiger= new Actor(550, 500, 140, 250);
        tiger.setBackground(object4);
        
        tiger.addProperty("Name", "Tiger");
        tiger.addProperty("Skin Color", "Orange");
        tiger.addProperty("Has Fur", "Yes");
        tiger.addProperty("Sound", "rawr");
        tiger.addProperty("Mood", "hungry");
        this.addObject(tiger);
        
        var object5 = new Image();
        object5.src = "img/wolf.svg";
        var wolf = new Actor(600, 240, 120, 200);
        wolf.setBackground(object5);
        
        wolf.addProperty("Name", "Wolfie");
        wolf.addProperty("Skin Color", "Gray");
        wolf.addProperty("Has Fur", "Yes");
        wolf.addProperty("Sound", "Aoooooo!");
        wolf.addProperty("Mood", "bored");
        this.addObject(wolf);
        
          var object6 = new Image();
        object6.src = "img/owl.svg";
        var owl= new Actor(65, 19, 70, 100);
        owl.setBackground(object6);
        
        owl.addProperty("Name", "Owl");
        owl.addProperty("Skin Color", "Brown");
        owl.addProperty("Has Fur", "No");
        owl.addProperty("Sound", "Kookoo!");
        owl.addProperty("Mood", "Shocked");
        this.addObject(owl);
        
    }
    
  /*  update(deltaTime) {
      this.character.state = this.character.stateEnum.SPEAKING; 
        
        switch(this.character.state){
            case this.character.stateEnum.WAITING:
                break;
            case this.character.stateEnum.SPEAKING:
                this.character.speak(this.game.getString("scenario3/text1"));
                break;
            default:
                break;
        }
         super.update(deltaTime);
    }
   
   display() {
        super.display();
        
        var bubble = this.character.speechBubble;
        if(bubble.isVisible()){
            this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", bubble.getText());
        }
    }  */
}