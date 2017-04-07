'use static'

class MainCharacter extends Actor {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.dirx = 100;
        this.diry = 100;
        
        /* Create and bind the cap object to the main chracter */
        var object1 = new Image();
        object1.src = "img/Hat-green.png";
        var cap = new Cap(this);
        cap.setBackground(object1);
        this.addObject(cap);
                
        this.propertiesWindow = new Properties(this);
        this.propertiesWindowVisible = false;
        
        this.addProperty("Name", "Hampus");
        this.addProperty("Age", "99");
        this.addProperty("isHungry", "true");
    }
    
    update(deltaTime, maxX, maxY) {
        /* Test of movement for the character */
        /*this.x += this.dirx * deltaTime;
        this.y += this.diry * deltaTime;
        
        if(this.x < 0) {
            this.dirx = Math.abs(this.dirx);
        }
        
        if(this.x +this.width > maxX) {
            this.dirx = -Math.abs(this.dirx);
        }
        
        if(this.y < 0) {
            this.diry = Math.abs(this.diry);
        }
        
        if(this.y + this.height > maxY) {
            this.diry = -Math.abs(this.diry);
        }*/
        
        super.update(deltaTime, maxX, maxY); // This has to be called in the end, otherwise the hat "falls behind"
    }
    
    onClick() {
        super.onClick();
        
        if(!this.propertiesWindowVisible) { // If the propertieswindow is not visible and the user clicks on the character
            this.addObject(this.propertiesWindow);
        } else {
            this.removeObject(this.propertiesWindow);
        }
        
        this.propertiesWindowVisible = !this.propertiesWindowVisible;
    }
}