'use strict'

/*
 * This class demonstrates the use of the Screen class.
 *
*/
class ScenarioOneScreen extends GameScreen {
    constructor(game) {
        super(game);
                
        this.background.src = "img/boy-bedroom-1.png";                                                                  // This image might be used for one of the scenarios in the game

        this.element1 = new Image();
        this.element1.src = "http://clipartix.com/wp-content/uploads/2016/05/Clip-art-stick-figure-clipart-image.jpeg"; // TMp test image
        this.character = new MainCharacter(50, 300, 100, 250);
        this.character.setBackground(this.element1);
        
        this.objects.push(this.character);
    }
}