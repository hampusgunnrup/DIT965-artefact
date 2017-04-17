'use static';

class MainCharacter extends Actor {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.dirx = 100;
        this.diry = 100;
        this.propertyChoices = new Array();
        this.stateEnum = {
            WAITING : "WAITING",
            SPEAKING : "SPEAKING"
        }
        
        this.state = this.stateEnum.WAITING;
        
        /* Create and bind the cap object to the main chracter */
        /*var object1 = new Image();
        object1.src = "img/Hat-green.png";
        var cap = new Cap(this);
        cap.setBackground(object1);
        this.addObject(cap);*/
        
        this.hairImage = new Image();
        this.hairImage.src = "/img/Kim/hair-normal.png";
        this.hair = new Object(this.x, this.y-1, this.width - 15, 200);
        this.hair.setBackground(this.hairImage);
        this.addObject(this.hair);
        
        this.shirtImage = new Image();
        this.shirtImage.src = "/img/Kim/tshirt-green.png";
        this.shirt = new Object(this.x, this.y, this.width - 10, 220);
        this.shirt.setBackground(this.shirtImage);
        this.addObject(this.shirt);
        
        this.mouthImage = new Image();
        this.mouthImage.src = "/img/Kim/mouth-happy.png";
        this.mouth = new Object(this.x, this.y, 20, 20);
        this.mouth.setBackground(this.mouthImage);
        this.addObject(this.mouth);
        
        this.speechBubble = new SpeechBubble(this);
        this.addObject(this.speechBubble);
        
        this.addProperty("Name", "Kim", []);
        this.addProperty("Age", "99", []);
        var choices = {
            "1" : "/img/Kim/hair-black.png",
            "2" : "/img/Kim/hair-blonde.png",
            "3" : "/img/Kim/hair-blue.png",
            "4" : "/img/Kim/hair-gray.png",
            "5" : "/img/Kim/hair-normal.png",
            "6" : "/img/Kim/hair-purple.png",
            "7" : "/img/Kim/hair-red.png",
        };
        this.addProperty("Hair", "", choices);
        
        var choices2 = {
            "1" : "/img/Kim/tshirt-blue.png",
            "2" : "/img/Kim/tshirt-green.png",
            "3" : "/img/Kim/tshirt-pink.png",
            "4" : "/img/Kim/tshirt-red.png",
            "5" : "/img/Kim/tshirt-yellow.png",
        };
        
        this.addProperty("T-shirt", "", choices2);
        
        var choices3 = {
            "1" : "/img/Kim/mouth-happy.png",
            "2" : "/img/Kim/mouth-sad.png",
            "3" : "/img/Kim/mouth-sad2.png",
            "4" : "/img/Kim/mouth-surprised.png",
            "5" : "/img/Kim/mouth-tired.png",
        };
        
        this.addProperty("Mood", "", choices3);
    }
    
    update(deltaTime, maxX, maxY) {
        this.hair.setX(this.x + 7);
        this.shirt.setX(this.x + 7);
        this.shirt.setY(this.y - 12);
        this.mouth.setX(this.x + 30);
        this.mouth.setY(this.y + 70);
        
        switch(this.state) {
            case this.stateEnum.WAITING:
                this.speechBubble.hide();
                break;
            case this.stateEnum.SPEAKING:
                this.speechBubble.show();
                break;
            default:
                this.speechBubble.hide();
                break;
        }
        
        super.update(deltaTime, maxX, maxY); // This has to be called in the end, otherwise the hat "falls behind"
    }
    
    onClick() {
        super.onClick();
    }
    
    speak(sentence) {
        super.speak(sentence);
        this.speechBubble.setText(sentence);
        this.state = this.stateEnum.SPEAKING;
    }
    
    addProperty(property, value, choices) {
        super.addProperty(property, value);
        
        this.propertyChoices.push(choices);
    }
    
    getChoices(propertyNumber) {
        var index = propertyNumber - 1;
        
        if(propertyNumber >= 0 &&  index < this.propertyChoices.length)
            return this.propertyChoices[index];
    
        return [];
    }
    
    setHair(background) {
        this.hairImage.src = background;
    }
    
    setShirt(background) {
        this.shirtImage.src = background;
    }
    
    setMood(background) {
        this.mouthImage.src = background;
    }
}