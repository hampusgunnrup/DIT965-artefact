'use strict';

class ScenarioTwoScreen extends GameScreen {
    constructor(game) {
        super(game);
        
        /* Class variables */
        this.propertiesVisible = new Array();
        this.task2HasPlayed = false;
        this.kimSpeaking = false;
        this.dadSpeaking = false;
        
        /* Screen configuration*/
        this.background.src = "img/Living-room.png";
        
        /* Main character */
        this.character = this.game.mainCharacter;
        this.character.walkRight(20);
        this.game.mainCharacter.walkUp(30);
        this.character.addProperty(this.game.getString("common/name"), "Kim", []);
        this.character.addProperty(this.game.getString("common/age"), "9", []);
        this.addObject(this.character);
        
        this.states = {
            TASK1 : "TASK1",
            TASK2 : "TASK2",
            TASK3 : "TASK3",
            SCENARIODONE : "SCENARIODONE",
        };
        this.state = this.states.TASK1;
        
        /* Grandpa */
        var object1 = new Image();
        object1.src = "img/oldman.svg";
        var grandpa = new Actor(400, 360, 180, 300 );
        this.grandpa = grandpa;
        grandpa.setBackground(object1);
        grandpa.addProperty(this.game.getString("common/name"), this.game.getString("common/grandpa"));
        grandpa.addProperty(this.game.getString("common/age"), this.game.getString("common/grandpaAge"));
        grandpa.addProperty(this.game.getString("common/hairColor"), this.game.getString("common/white"));
        grandpa.addProperty(this.game.getString("common/mood"), this.game.getString("common/surprised"));
        grandpa.addProperty(this.game.getString("common/job"), this.game.getString("common/teacher"));
        this.addObject(grandpa);
        
        /* Dad */
        var object2 = new Image();
        object2.src = "img/Dad.svg";
        var dad = new Actor(600, 360, 180, 300 );
        this.dad = dad;
        dad.setBackground(object2);
        dad.addProperty(this.game.getString("common/name"), this.game.getString("common/dad"));
        dad.addProperty(this.game.getString("common/age"), this.game.getString("common/dadAge"));
        dad.addProperty(this.game.getString("common/hairColor"), this.game.getString("common/brown"));
        dad.addProperty(this.game.getString("common/mood"), this.game.getString("common/sleepy"));
        dad.addProperty(this.game.getString("common/job"), this.game.getString("common/police"));
        this.addObject(dad);
        
        /* Mom */
        var object3 = new Image();
        object3.src = "img/mom.svg";
        var mom = new Actor(200, 360, 180, 300 );
        this.mom = mom;
        mom.setBackground(object3);
        mom.addProperty(this.game.getString("common/name"), this.game.getString("common/mom"));
        mom.addProperty(this.game.getString("common/age"), this.game.getString("common/momAge"));
        mom.addProperty(this.game.getString("common/hairColor"), this.game.getString("common/red"));
        mom.addProperty(this.game.getString("common/mood"), this.game.getString("common/happy"));
        mom.addProperty(this.game.getString("common/job"), this.game.getString("common/chef"));
        this.addObject(mom);

        var game = this.game;
        this.game.taskWindow.reset(function() {
            game.setScreen(new ScenarioThreeScreen(game)); 
        });
        this.game.taskWindow.addTask(this.game.getString("scenario2/task1"), "/assets/audio/" + this.game.chosenLanguage + "/S2T1.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario2/task2"), "/assets/audio/" + this.game.chosenLanguage + "/S2T2.m4a");
        this.game.taskWindow.addTask(this.game.getString("scenario2/task3"), "/assets/audio/" + this.game.chosenLanguage + "/S2T3.m4a");
      
        for(var i = 0; i < this.objects.length; i++) { // For every object on the screen
            this.propertiesVisible[i] = false; // Initilize everything as false
        }
        
        this.humanClass = new ClassWindow(10, 10, 200, 200, this.game.getString("scenario2/humanClass"));
        this.humanClass.addProperty(this.game.getString("common/name"), "");
        this.humanClass.addProperty(this.game.getString("common/age"), "");
        this.humanClass.addProperty(this.game.getString("common/hairColor"), "");
        this.humanClass.addProperty(this.game.getString("common/mood"), "");
        this.humanClass.addProperty(this.game.getString("common/job"), "");
        
        this.hideProperties();
        this.game.getTouchEvents(); // Clear the buffer
    }
    
    update(deltaTime) {
        switch(this.state) {
            case this.states.TASK1:
                if(this.checkPropertiesClicked() && !this.game.taskWindow.isPlaying) {
                    this.game.taskWindow.completeTask();
                    this.state = this.states.TASK2;
                    this.kimSpeaking = false;
                } else if(this.game.taskWindow.isPlaying) {
                    this.kimSpeaking = true;
                } else {
                    this.kimSpeaking = false;
                }
                break;
            case this.states.TASK2:
                if(this.game.taskWindow.isPlaying) {
                    this.task2HasPlayed = true;
                    this.kimSpeaking = true;

                    if(this.game.taskWindow.getCurrentAudio().currentTime >= 23)
                        this.dadSpeaking = true;
                }
                else if(this.task2HasPlayed) {
                    this.kimSpeaking = false;
                    this.dadSpeaking = false;
                    for(var i = 0; i < this.touchEvents.length; i++) {
                        if(this._hasClickedOnPlus(this.touchEvents[i], this.humanClass)) {
                            this.humanClass.addProperty(this.game.getString("common/umbrella"), "");
                            this.humanClass.setHeight(this.humanClass.getHeight() + 30);
                            this.game.mainCharacter.addProperty(this.game.getString("common/umbrella"), this.game.getString("scenario2/kimUmbrella"));
                            this.dad.addProperty(this.game.getString("common/umbrella"), this.game.getString("scenario2/othersUmbrella"));
                            this.mom.addProperty(this.game.getString("common/umbrella"), this.game.getString("scenario2/othersUmbrella"));
                            this.grandpa.addProperty(this.game.getString("common/umbrella"), this.game.getString("scenario2/othersUmbrella"));
                            
                            var umbrellaImage = new Image();
                            umbrellaImage.src = "/img/umbrella/UmbrellaHat0.png";
                            var umbrella = new Object(this.game.mainCharacter.x - 20, this.game.mainCharacter.y-80, this.game.mainCharacter.width + 30, 200);
                            umbrella.setBackground(umbrellaImage);
                            this.game.mainCharacter.addObject(umbrella);
                            
                            var umbrellaImage1 = new Image();
                            umbrellaImage1.src = "/img/umbrella/UmbrellaHat8.png";
                            var umbrella1 = new Object(this.dad.x - 20, this.dad.y-80, this.dad.width + 30, 200);
                            umbrella1.setBackground(umbrellaImage1);
                            this.dad.addObject(umbrella1);
                            
                            var umbrellaImage2 = new Image();
                            umbrellaImage2.src = "/img/umbrella/UmbrellaHat1.png";
                            var umbrella2 = new Object(this.mom.x + 20, this.mom.y-100, this.mom.width + 30, 200);
                            umbrella2.setBackground(umbrellaImage2);
                            this.mom.addObject(umbrella2);
                            
                            var umbrellaImage3 = new Image();
                            umbrellaImage3.src = "/img/umbrella/UmbrellaHat3.png";
                            var umbrella3 = new Object(this.grandpa.x - 20, this.grandpa.y-80, this.grandpa.width + 30, 200);
                            umbrella3.setBackground(umbrellaImage3);
                            this.grandpa.addObject(umbrella3);
                            
                            this.game.taskWindow.completeTask();
                            this.state = this.states.TASK3;
                        }
                    }
                }
                break;
            case this.states.TASK3:
                this.kimSpeaking = false;
                if(this.game.taskWindow.isPlaying)
                    this.kimSpeaking = true;
                else if(this.checkIfAnyClick()) {
                    this.game.taskWindow.completeTask();
                    this.state = this.states.SCENARIODONE;
                }
                break;
            case this.states.SCENARIODONE:
                this.kimSpeaking = false;
                break;
            default: break;    
        }
        super.update(deltaTime);
    }
   
    display() {
        super.display();
        
        var bubble = this.character.speechBubble;
        if(this.kimSpeaking && !this.dadSpeaking){
            this.graphics.drawSpeechBubble(bubble.x, bubble.y, bubble.width, bubble.height, "#FFF", "...");
        } else if(this.dadSpeaking){
            this.graphics.drawSpeechBubble(bubble.x + 550, bubble.y, bubble.width, bubble.height, "#FFF", "...");
        }
    
        if(this.task2HasPlayed && (!this.game.taskWindow.isPlaying || this.state !== this.states.TASK2))
            this._drawClassWindow(this.humanClass, this.graphics);
    }
    
    checkIfAnyClick() {
        for(var i = 0; i < this.objects.length; i++)
            if(this.objects[i].isPropertiesWindowVisible())
                return true;
                
        return false;
    }
    
    /* Returns true if all of the objects on the screen has been clicked */
    checkPropertiesClicked() {
        for(var i = 0; i < this.objects.length; i++) {
            if(this.objects[i].isPropertiesWindowVisible()) {
                this.propertiesVisible[i] = true;
            }
        }
        
        for(var i = 0; i < this.propertiesVisible.length; i++) {
            if(!this.propertiesVisible[i] && this.objects[i] !== this.game.mainCharacter)
                return false;
        }
        
        return true;
    }
    
    /*
     * Draws the passed in class window using the passed in graphics instance.
     * The underscore before the methodname depicts that it is supposed to be a private method(javascript doesn't have private members)
    */
    _drawClassWindow(classWindow, graphics) {
        var width = classWindow.getWidth();
        var H1Size = graphics.getH1Size(classWindow.getName());
        var H1X = classWindow.getX() + width/2 - H1Size.width/2;
        var H1Y = classWindow.getY() + H1Size.height;
        
        if(classWindow.getHeight() == 0)
            classWindow.setHeight(H1Y + (H1Size.height + 5)*(classWindow.actor.properties.size + 1) - classWindow.getY());
        
        graphics.drawRoundedSquare(classWindow.getX(), classWindow.getY(), classWindow.getWidth(), classWindow.getHeight(), "#ADD8E6");
        graphics.drawH1(H1X, H1Y, classWindow.getName());

        var x = H1X;
        var y = H1Y;

        classWindow.properties.forEach(function(value, key, map) {
            y += H1Size.height + 5;
            graphics.drawH2(x, y, key + ":");
            graphics.drawParagraph(x + width/2, y, value);
        });
        
        var image = new Image();
        image.src = "img/green-plus.png";
        graphics.drawElement(classWindow.getX() + 25, classWindow.getY() + classWindow.getHeight() - 35, 30, 30, image, 0);
    }
    
    _hasClickedOnPlus(touchEvent, classWindow) {
        if(touchEvent.x >= (classWindow.getX() + 25) && touchEvent.x <= (classWindow.getX() + 25 + 30) &&
           touchEvent.y >= (classWindow.getY() + classWindow.getHeight() - 35) && touchEvent.y <= (classWindow.getY() + classWindow.getHeight() - 35 + 30)
        ) {
            return true;
        }
        
        return false;
    }
}