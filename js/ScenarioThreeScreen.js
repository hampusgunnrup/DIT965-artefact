'use strict';

class ScenarioThreeScreen extends GameScreen {
    constructor(game) {
        super(game);
        this.task2HasPlayed = false;        
        
        this.states = {
            TASK1 : "TASK1",
            TASK2 : "TASK2",
            SCENARIODONE : "SCENARIODONE",
        };
        
        this.state = this.states.TASK1;
        
        this.graphics.setBlur("#000");
        this.background.src = "img/Zoo-rain.png";
        
        this.character = this.game.mainCharacter;
        this.character.addProperty(this.game.getString("common/name"), "Kim", []);
        this.character.addProperty(this.game.getString("common/age"), "9", []);
        this.addObject(this.character);
     
        
        var object1 = new Image();     
        object1.src = "img/Crocodile.svg";
        var crocodile = new Actor(380, 200, 120, 200);
        crocodile.setBackground(object1);
       
       
        crocodile.addProperty(this.game.getString("common/name"), this.game.getString("common/crocodile"));
        crocodile.addProperty(this.game.getString("common/color"), this.game.getString("common/green"));
        crocodile.addProperty(this.game.getString("common/skin"), this.game.getString("common/leather"));
        crocodile.addProperty(this.game.getString("common/isHungry"), this.game.getString("common/no"));
        crocodile.addProperty(this.game.getString("common/dots"), this.game.getString("common/dots"));
        crocodile.addProperty(this.game.getString("common/swim"), this.game.getString("common/empty"));
        crocodile.addProperty(this.game.getString("common/crawl"), this.game.getString("common/empty"));
        crocodile.addProperty(this.game.getString("common/eatMeat"), this.game.getString("common/empty"));
        
        this.addObject(crocodile);
        
        var object2 = new Image();   
        object2.src = "img/monkey2.svg";
        var monkey = new Actor(250, 450, 120, 220 );
        monkey.setBackground(object2);
        
         
        monkey.addProperty(this.game.getString("common/name"), this.game.getString("common/monkey"));
        monkey.addProperty(this.game.getString("common/color"), this.game.getString("common/brownAnimal"));
        monkey.addProperty(this.game.getString("common/skin"), this.game.getString("common/fur"));
        monkey.addProperty(this.game.getString("common/isHungry"), this.game.getString("common/yes"));
        monkey.addProperty(this.game.getString("common/dots"), this.game.getString("common/dots"));
        monkey.addProperty(this.game.getString("common/swing"), this.game.getString("common/empty"));
        monkey.addProperty(this.game.getString("common/eatBanana"), this.game.getString("common/empty"));
        this.addObject(monkey);
        
        var object3 = new Image();
        object3.src = "img/parrot.svg";
        var parrot = new Actor(150, 300, 80, 140 );
        parrot.setBackground(object3);
        
        parrot.addProperty(this.game.getString("common/name"), this.game.getString("common/parrot"));
        parrot.addProperty(this.game.getString("common/color"), this.game.getString("common/GR"));
        parrot.addProperty(this.game.getString("common/skin"), this.game.getString("common/feather"));
        parrot.addProperty(this.game.getString("common/isHungry"), this.game.getString("common/yes"));
        parrot.addProperty(this.game.getString("common/dots"), this.game.getString("common/dots"));
        parrot.addProperty(this.game.getString("common/fly"), this.game.getString("common/empty"));
        parrot.addProperty(this.game.getString("common/sing"), this.game.getString("common/empty"));
        this.addObject(parrot);
        
        var object4 = new Image();
        object4.src = "img/Tiger.svg";
        var tiger= new Actor(580, 500, 140, 250);
        tiger.setBackground(object4);
        
        
        tiger.addProperty(this.game.getString("common/name"), this.game.getString("common/tiger"));
        tiger.addProperty(this.game.getString("common/color"), this.game.getString("common/orange"));
        tiger.addProperty(this.game.getString("common/skin"), this.game.getString("common/fur"));
        tiger.addProperty(this.game.getString("common/isHungry"), this.game.getString("common/yes"));
        tiger.addProperty(this.game.getString("common/dots"), this.game.getString("common/dots"));
        tiger.addProperty(this.game.getString("common/run"), this.game.getString("common/empty"));
        tiger.addProperty(this.game.getString("common/eatMeat"), this.game.getString("common/empty"));
        this.addObject(tiger);
        
        var object5 = new Image();
        object5.src = "img/wolf.svg";
        var wolf = new Actor(600, 240, 120, 200);
        wolf.setBackground(object5);
        
        
        wolf.addProperty(this.game.getString("common/name"), this.game.getString("common/wolf"));
        wolf.addProperty(this.game.getString("common/color"), this.game.getString("common/gray"));
        wolf.addProperty(this.game.getString("common/skin"), this.game.getString("common/fur"));
        wolf.addProperty(this.game.getString("common/isHungry"), this.game.getString("common/no"));
        wolf.addProperty(this.game.getString("common/dots"), this.game.getString("common/dots"));
        wolf.addProperty(this.game.getString("common/run"), this.game.getString("common/empty"));
        wolf.addProperty(this.game.getString("common/eatMeat"), this.game.getString("common/empty"));
        wolf.addProperty(this.game.getString("common/yowl"), this.game.getString("common/empty"));
        this.addObject(wolf);
        
          var object6 = new Image();
        object6.src = "img/owl.svg";
        var owl= new Actor(65, 19, 70, 100);
        owl.setBackground(object6);
         
        owl.addProperty(this.game.getString("common/name"), this.game.getString("common/owl"));
        owl.addProperty(this.game.getString("common/color"), this.game.getString("common/brownAnimal"));
        owl.addProperty(this.game.getString("common/skin"), this.game.getString("common/feather"));
        owl.addProperty(this.game.getString("common/isHungry"), this.game.getString("common/no"));
        owl.addProperty(this.game.getString("common/dots"), this.game.getString("common/dots"));
        owl.addProperty(this.game.getString("common/fly"), this.game.getString("common/empty"));
        owl.addProperty(this.game.getString("common/hoo"), this.game.getString("common/empty"));
        this.addObject(owl);

        var game = this.game;
        this.game.taskWindow.reset(function() {
            game.setScreen(new MenuScreen(game));
        });
        this.game.taskWindow.addTask(this.game.getString("scenario3/task1"), "/assets/audio/SWE/S3T1.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario3/task2"), "/assets/audio/SWE/S3T2.m4a");
        
        this.propertiesVisible = new Array();
        for(var i = 0; i < this.objects.length; i++) {
            this.propertiesVisible[i] = false;
        }
      
        this.hideProperties();
        this.game.getTouchEvents(); // Clear the buffer
    }
    
    update(deltaTime) {
        switch(this.state){
            case this.states.TASK1:
                if(this.checkPropertiesClicked()) {
                    this.game.taskWindow.completeTask();
                    this.state = this.states.TASK2;
                }
                break;
            case this.states.TASK2:
                if(this.game.taskWindow.isPlaying)
                    this.task2HasPlayed = true;
                if(this.task2HasPlayed && !this.game.taskWindow.isPlaying) {
                    this.game.taskWindow.completeTask();
                    this.state = this.states.SCENARIODONE;
                }
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
          //  this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", bubble.getText());
        }
    }
    
    /* Returns true if all of the objects on the screen has been clicked */
    checkPropertiesClicked() {
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].isPropertiesWindowVisible() && this.objects[i] !== this.game.mainCharacter) {
                this.propertiesVisible[i] = true;
            }
        }
        
        var number = 0;
        for(var i = 0; i < this.propertiesVisible.length; i++) {
            if(this.propertiesVisible[i])
                number++;
        }
        
        return number >= 3; // If the user has clicked three animals
    }
}