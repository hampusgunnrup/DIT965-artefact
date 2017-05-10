'use strict';

/*
 * This class demonstrates the use of the Screen class.
 *
*/
class ScenarioOneScreen extends GameScreen {
    constructor(game) {
        super(game);
        
        this.background.src = "img/boy-bedroom-1.png";
        this.kimSpeaking = false;

        /* Main character */
        this.character = this.game.mainCharacter;
        this.character.walkRight(40);
        this.objects.push(this.character);
        
        this.character.addProperty(this.game.getString("common/name"), "Kim", []);
        this.character.addProperty(this.game.getString("common/age"), "9", []);
        
        var choices = {
            "1" : "/img/Kim/hair-black.png",
            "2" : "/img/Kim/hair-blonde.png",
            "3" : "/img/Kim/hair-blue.png",
            "4" : "/img/Kim/hair-gray.png",
            "5" : "/img/Kim/hair-normal.png",
            "6" : "/img/Kim/hair-purple.png",
            "7" : "/img/Kim/hair-red.png",
        };
        this.character.addProperty(this.game.getString("scenario1/hair"), "", choices);
        
        var choices2 = {
            "1" : "/img/Kim/tshirt-blue.png",
            "2" : "/img/Kim/tshirt-green.png",
            "3" : "/img/Kim/tshirt-pink.png",
            "4" : "/img/Kim/tshirt-red.png",
            "5" : "/img/Kim/tshirt-yellow.png",
        };
        
        this.character.addProperty(this.game.getString("scenario1/tshirt"), "", choices2);
        
        var choices3 = {
            "1" : "/img/Kim/mouth-happy.png",
            "2" : "/img/Kim/mouth-sad.png",
            "3" : "/img/Kim/mouth-sad2.png",
            "4" : "/img/Kim/mouth-surprised.png",
            "5" : "/img/Kim/mouth-tired.png",
        };
        
        this.character.addProperty(this.game.getString("scenario1/mood"), "", choices3);
        
        /* Class variables */
        this.states = {
            POINTINGONTASK : "POINTINGONTASK",
            PLAYINGTASK : "PLAYINGTASK",
            POINTINGATKIM : "POITINGATKIM",
            TASKDONE : "TASKDONE",
            POINTINGATTOYS : "POINTINGATTOYS",
            POINTINGATPROPERTY : "POINTINGATPROPERTY",
            CHOOSINGPROPERTY : "CHOOSINGPROPERTY",
            SCENARIODONE : "SCENARIODONE",
        };
        this.state = this.states.POINTINGONTASK;
        
        this.change = 5;
        
        /* Objects */
        var object1 = new Image();
        object1.src = "img/ToyCar.png";
        var toy = new Object(400, 480, 110, 130);
        toy.setBackground(object1);
        
        
        toy.addProperty(this.game.getString("common/name"), this.game.getString("common/toyCar"));
        toy.addProperty(this.game.getString("common/color"), this.game.getString("common/green"));
        toy.addProperty(this.game.getString("common/material"), this.game.getString("common/plastic"));
        this.addObject(toy);
        
        var object2 = new Image();
        object2.src = "img/ToyBear.svg";
        var toy2 = new Object(290, 430, 90, 120);
        toy2.setBackground(object2);
        
         toy2.addProperty(this.game.getString("common/name"), this.game.getString("common/teddyBear"));
         toy2.addProperty(this.game.getString("common/color"), this.game.getString("common/orange"));
         toy2.addProperty(this.game.getString("common/material"), this.game.getString("common/fabric"));
        this.addObject(toy2); 
        
        var object3 = new Image();
        object3.src = "img/ToyHorse.svg";
        this.toy3 = new Object(600, 550, 120, 140);
        this.toy3.setBackground(object3);
        
        this.toy3.addProperty(this.game.getString("common/name"), this.game.getString("common/horsie"));
        this.toy3.addProperty(this.game.getString("common/color"), this.game.getString("common/brownAnimal"));
        this.toy3.addProperty(this.game.getString("common/material"), this.game.getString("common/wood"));
  
        this.addObject(this.toy3);
        this.rot = 1;
        
         var object4 = new Image();
        object4.src = "img/Cap.png";
         var cap = new Object(485, 290,100, 130);
        cap.setBackground(object4);
        
        cap.addProperty(this.game.getString("common/name"), this.game.getString("common/cap"));
        cap.addProperty(this.game.getString("common/color"), this.game.getString("common/red"));
        cap.addProperty(this.game.getString("common/material"), this.game.getString("common/fabric"));
        this.addObject(cap); 
        
          var object5 = new Image();
        object5.src = "img/Baseball.svg";
         var ball = new Object(870, 470,50, 70);
        ball.setBackground(object5);
        
        ball.addProperty(this.game.getString("common/name"), this.game.getString("common/baseball"));
        ball.addProperty(this.game.getString("common/color"), this.game.getString("common/white"));
        ball.addProperty(this.game.getString("common/material"), this.game.getString("common/fabric"));
  
        this.addObject(ball); 

        /* Task window */
        var game = this.game;                            // Inside of the function below, "this" refers to something else that the instance of the class
        this.game.taskWindow.reset(function() {          // Pass in the function that is to be executed when the continue button is clicked
            game.setScreen(new ScenarioTwoScreen(game)); // Set the screen to the next scenario
        });
        this.game.taskWindow.addTask(this.game.getString("scenario1/task1"), "/assets/audio/" + this.game.chosenLanguage + "/S1T1.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task2"), "/assets/audio/" + this.game.chosenLanguage + "/S1T2.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task3"), "/assets/audio/" + this.game.chosenLanguage + "/S1T3.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task4"), "/assets/audio/" + this.game.chosenLanguage + "/S1T4.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario1/task5"), "/assets/audio/" + this.game.chosenLanguage + "/S1T5.m4a");
    
        /* Sets the initial position for the arrow, and pushes it to the objects on the screen. */
        /* Having it in the end, makes sure that it is drawn above all other items. */
        this.game.arrow.setX(700);
        this.game.arrow.setY(25);
        this.objects.push(this.game.arrow);
        this.arrowVisible = true;
        
        this.propertyChooser = new PropertyChooser();
        this.propertyNumber = 3; // Hair color
        
        this.hideProperties();
        this.game.getTouchEvents(); // Clear the buffer
    }
    
    update(deltaTime) {
        
        /* Main logic of the scenario. It consists of a set of states and class variables. Helper methods exists below the update method. */
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
                    this.kimSpeaking = true;
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
                    this.kimSpeaking = false;
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
                        this.game.arrow.setX(700);
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
                    this.game.arrow.setX(700);
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
                        this.game.arrow.setX(700);
                        this.game.arrow.setY(500);
                    }
                    else if(this.propertyNumber == 4) {
                        this.character.setShirt(this.character.getChoices(this.propertyNumber)[index]);
                        this.game.arrow.setX(700);
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
                    this.game.arrow.setRotation(-90);
                    this.game.arrow.setX(400);
                    this.game.arrow.setY(540);
                }
                
                this.animateArrow(true);
                break;
            default:
                break;
        }
        
        this.animateToy3();
        
        super.update(deltaTime);
    }
    
    display() {
        super.display();
        
        var bubble = this.game.mainCharacter.speechBubble;

        if(this.kimSpeaking){
            this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", "...");
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
    
    checkPropertiesClicked(index) {
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].isPropertiesWindowVisible()) {
                return true;
            }
        }
        
        return false;
    }
    
    hideProperties() {
        console.log("yup");
        for(var i = 0; i < this.objects.length; i++) {
            this.objects[i].hideProperties();
        }
    }
}
