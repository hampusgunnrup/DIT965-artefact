'use strict';

/*
 * This class demonstrates the use of the Screen class.
 *
*/
class ScenarioOneScreen extends GameScreen {
    constructor(game) {
        super(game);
        
        this.background.src = "img/boy-bedroom-1.png";
        this.graphics.setBlur("#000");

        this.character = this.game.mainCharacter;
        this.character.walkRight(40);
        this.objects.push(this.character);
        
        this.states = {
            POINTINGONTASK : "POINTINGONTASK",
            PLAYINGTASK : "PLAYINGTASK",
            POINTINGATKIM : "POITINGATKIM",
            TASKDONE : "TASKDONE",
            POINTINGATTOYS : "POINTINGATTOYS",
            POINTINGATPROPERTY : "POINTINGATPROPERTY",
            CHOOSINGPROPERTY : "CHOOSINGPROPERTY",
        };
        this.state = this.states.POINTINGONTASK;
        
        this.change = 5;
        var object1 = new Image();
        object1.src = "img/ToyCar.png";
        var toy = new Object(400, 480, 110, 130);
        toy.setBackground(object1);
        
        toy.addProperty("Name", "Car toy");
        toy.addProperty("Color", "Green");
        toy.addProperty("material", "plastic");
        this.addObject(toy);
        
        var object2 = new Image();
        object2.src = "img/ToyBear.svg";
        var toy2 = new Object(290, 430, 90, 120);
        toy2.setBackground(object2);
        
        toy2.addProperty("Name", "teddy bear");
        toy2.addProperty("Color", "brown");
        toy2.addProperty("Material", "fabric");
        this.addObject(toy2); 
        
        var object3 = new Image();
        object3.src = "img/ToyHorse.svg";
        this.toy3 = new Object(600, 550, 120, 140);
        this.toy3.setBackground(object3);
        
        this.toy3.addProperty("Name", "Horsie");
        this.toy3.addProperty("Color", "brown");
        this.toy3.addProperty("Material", "Plastic");
        this.addObject(this.toy3);
        this.rot = 1;

        var game = this.game;
        this.game.taskWindow.reset(function() {
            game.setScreen(new ScenarioTwoScreen(game));
        });
        this.game.taskWindow.addTask(this.game.getString("scenario1/task1"), "/assets/audio/tmp1.wav");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task2"), "/assets/audio/tmp2.wav");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task3"), "/assets/audio/tmp3.wav");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task4"), "/assets/audio/tmp1.wav");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task5"), "/assets/audio/tmp2.wav");
    
        /* Sets the initial position for the arrow, and pushes it to the objects on the screen. */
        /* Having it in the end, makes sure that it is drawn over all other items. */
        this.game.arrow.setX(500);
        this.game.arrow.setY(25);
        this.objects.push(this.game.arrow);
        this.arrowVisible = true;
        
        this.propertyChooser = new PropertyChooser();
        this.propertyNumber = 3; // Hair color
    }
    
    update(deltaTime) {
        switch(this.state) {
            case this.states.POINTINGONTASK:                     // This case is used when the arrow is pointing towards the taskbar(on any task) 
                this.animateArrow(false);                        // Animiate the arrow. False stands for not adjusting it to the same place, i.e. it moves when it gets bigger.
                if(this.game.taskWindow.isPlaying) {             // User pressed the task
                    this.state = this.states.PLAYINGTASK;        // The task is playing audio
                    this.change = -5;                            // The change variable is used for the animation of the arrow. -5 means that it is supposed to get smaller
                }
                break;
            case this.states.PLAYINGTASK:                        // The audio is playing on one of the tasks
                if(this.game.taskWindow.isPlaying) {             // As long as the audio is playing
                    this.hideProperties();                       // Hide the properties window when task2 is clicked
                    this.animateHideArrow();                     // Animation for hiding the arrow(this gets called for every update call)
                    this.arrowVisible = false;                   // The arrow is no hidden(this flag is used to determine if the arrow's properties needs to be restored)
                } else {                                         // When the audio stops
                    if(this.game.arrow.getY() == 25)             // If the arrow is pointing on task1(Introduction)
                        this.state = this.states.POINTINGATKIM;  // Point at kim case
                    if(this.game.arrow.getY() == 200)            // If the arrow is pointing on task2(Properties)
                        this.state = this.states.POINTINGATTOYS; // Point on the toys case
                    if(this.game.arrow.getY() >= 350)            // If the arrow is pointing on task2(Properties)
                        this.state = this.states.POINTINGATKIM;  // Point on the toys case
                }
                break;
            case this.states.POINTINGATKIM:
                if(!this.arrowVisible) {
                    this.addObject(this.game.arrow);
                    this.game.arrow.setWidth(200);
                    this.game.arrow.setHeight(100);
                    this.game.arrow.setX(10 - this.change/2);
                    this.game.arrow.setY(220);
                    this.game.arrow.setRotation(90);
                    this.arrowVisible = true;
                }
                
                if(this.character.isPropertiesWindowVisible()) {
                    if(!this.game.taskWindow.isTaskDone(1)) { // If task1 is the current task
                        this.game.taskWindow.completeTask();
                        this.state = this.states.POINTINGONTASK;
                        this.game.arrow.setX(500);
                        this.game.arrow.setY(200);
                        this.game.arrow.setRotation(0);
                    } else {
                        this.game.arrow.setRotation(180);
                        this.game.arrow.setX(420);
                        this.state = this.states.POINTINGATPROPERTY;
                        
                        if(this.propertyNumber == 3) {
                            this.game.arrow.setY(510);
                        } else if(this.propertyNumber == 4) {
                            this.game.arrow.setY(540);
                        } else if(this.propertyNumber == 5) {
                            this.game.arrow.setY(570);
                        }
                    }
                }
                
                this.animateArrow(true);
                break;
            case this.states.POINTINGATTOYS:
                if(!this.arrowVisible) {
                    this.addObject(this.game.arrow);
                    this.game.arrow.setWidth(200);
                    this.game.arrow.setHeight(100);
                    this.game.arrow.setX(350 - this.change/2);
                    this.game.arrow.setY(300);
                    this.game.arrow.setRotation(90);
                    this.arrowVisible = true;
                }
                
                if(this.checkPropertiesClicked() && !this.character.isPropertiesWindowVisible()) {
                    this.game.taskWindow.completeTask();
                    this.state = this.states.POINTINGONTASK;
                    this.game.arrow.setX(500);
                    this.game.arrow.setY(350);
                    this.game.arrow.setRotation(0);
                }
                
                this.animateArrow(true);
                break;
            case this.states.POINTINGATPROPERTY:
                this.animateArrow(false);

                if(this.character.getPropertyClicked() == this.propertyNumber) {
                    this.propertyChooser.reset();
                    this.propertyChooser.setOptions(this.character.getChoices(this.propertyNumber));
                    this.propertyChooser.show();
                    this.state = this.states.CHOOSINGPROPERTY;
                    this.change = -5; 
                }
                break;
            case this.states.CHOOSINGPROPERTY:
                if(this.propertyChooser.hasChosen()) {
                    var index = this.propertyChooser.getChoice();
                    this.resetArrow();
                    this.state = this.states.POINTINGONTASK;

                    if(this.propertyNumber == 3) {
                        this.character.setHair(this.character.getChoices(this.propertyNumber)[index]);
                        this.game.arrow.setX(500);
                        this.game.arrow.setY(500);
                    }
                    else if(this.propertyNumber == 4) {
                        this.character.setShirt(this.character.getChoices(this.propertyNumber)[index]);
                        this.game.arrow.setX(500);
                        this.game.arrow.setY(600);
                    }
                    else if(this.propertyNumber == 5) {
                        this.character.setMood(this.character.getChoices(this.propertyNumber)[index])
                        this.state = this.states.SCENARIODONE;
                    }
                        
                    this.propertyNumber++;
                    this.game.taskWindow.completeTask();
                } else {
                    this.animateHideArrow();
                }
                break;
            case this.states.SCENARIODONE:
                if(this.game.arrow.getX() == 0) {
                    this.resetArrow();
                    this.game.arrow.setX(500);
                    this.game.arrow.setY(600);
                }
                
                this.animateArrow(false);
                break;
            default:
                break;
        }
        
        this.animateToy3();
        
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
            this.game.arrow.setX(x - this.change/2); // Makes it stay in the same position
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
    
    resetArrow() {
        this.game.arrow.setX(0);
        this.game.arrow.setY(0);
        this.game.arrow.setWidth(200);
        this.game.arrow.setHeight(100);
        this.game.arrow.setRotation(0);
        this.arrowVisible = true;
        this.objects.push(this.game.arrow);
    }
    
    animateToy3() {
        var rot = this.toy3.getRotation();

        if(rot > 30 || rot < -10)
            this.rot = -this.rot;
            
        this.toy3.setRotation(rot + this.rot);
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
