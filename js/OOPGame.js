'use strict';

/*
 * The game class for the actual game.
 * It contains all of the functionality that the Game class has, but adds a few specific members and methods.
*/
class OOPGame extends Game {
    constructor(canvas, taskWindow) {
        super(canvas);
        
        this.taskWindow = taskWindow;
        
        var image1 = new Image();
        var image2 = new Image();
        
        /* Main character initialization */
        this.mainCharacter = new MainCharacter(50, 700, 120, 200);
        image1.src = "img/young-boy.svg";
        this.mainCharacter.setBackground(image1);
        
        /* Arrow */
        this.arrow = new Object(0, 0, 200, 100);
        this.arrow.setClickable(false); // Quick fix
        image2.src = "img/arrow.png";
        this.arrow.setBackground(image2);
        
        /* Initialize a file with the textstrings for this game */
        this.file = new FileIO("/assets/text.xml");
        this.file.open();
    }
    
    /*
     * Returns a reference to the main character.
    */
    getMainCharacter() {
        return this.mainCharacter;
    }
    
    getStringsFile() {
        return this.file;
    }
    
    getString(string) {
        return this.file.getString(string);
    }
}