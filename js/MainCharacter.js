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
        this.hair = new Object(this.x, this.y, this.width, 200); //initial x,y,w,h
        this.hair.setBackground(this.hairImage);
        this.addObject(this.hair);
        
        this.shirtImage = new Image();
        this.shirtImage.src = "/img/Kim/tshirt-green.png";
        this.shirt = new Object(this.x, this.y, this.width, 220);
        this.shirt.setBackground(this.shirtImage);
        this.addObject(this.shirt);
        
        this.mouthImage = new Image();
        this.mouthImage.src = "/img/Kim/mouth-happy.png";
        this.mouth = new Object(this.x, this.y, 20, 20);
        this.mouth.setBackground(this.mouthImage);
        this.addObject(this.mouth);
        
        this.speechBubble = new SpeechBubble(this);
        this.addObject(this.speechBubble);
    }
    
    update(deltaTime, maxX, maxY) {
        this.hair.setX(this.x);
        this.hair.setY(this.y - 1);
        
        this.shirt.setX(this.x);
        this.shirt.setY(this.y - 12);
        
        this.mouth.setX(this.x + 27);
        this.mouth.setY(this.y + 70);
        
        switch(this.state) {
            case this.stateEnum.WAITING:
                this.speechBubble.hide();
                break;
            case this.stateEnum.SPEAKING:
                this.speechBubble.show();
                this.state = this.stateEnum.WAITING;
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