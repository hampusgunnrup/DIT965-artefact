'use strict';

/*
 * The game class for the actual game.
 * It contains all of the functionality that the Game class has, but adds a few specific members and methods.
*/
class OOPGame extends Game {
    constructor(canvas) {
        super(canvas);
        
        /* Main character initialization */
        this.mainCharacter = new MainCharacter(20, this.height - 250 - 20, 100, 250);
        var mainCharacterBackground = new Image();
        mainCharacterBackground.src = "http://clipartix.com/wp-content/uploads/2016/05/Clip-art-stick-figure-clipart-image.jpeg"; // Change this image
        this.mainCharacter.setBackground(mainCharacterBackground);
        
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
        var finalString = "";
        
        if(this.file.xhttp.readyState == 4 && this.file.xhttp.status == 200 && this.file.xml != null && this.file.xml != undefined) {
            var array = string.split("/");
            var currentTag = this.file.xml.getElementsByTagName(array[0])[0];                 // Get the outermost tag
            
            for(var i = 1; i < array.length; i++) {                                            // For every string name
                try {
                    currentTag = currentTag.getElementsByTagName(array[i])[0];
                } catch(e) {                                                                   // If getElementsByTagName does not find the passed in tag
                    console.log("OOPGame.js getString(string) string not found at: " + string);
                    return ""; 
                }
            }
            
            finalString = currentTag.childNodes[0].nodeValue;
        }
        
        return finalString; //this.file.xml.getElementsByTagName("strings")[0].getElementsByTagName(string)[0].childNodes[0].nodeValue; 
    }
}