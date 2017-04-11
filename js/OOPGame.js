'use strict';

class OOPGame extends Game {
    constructor(canvas) {
        super(canvas);
        this.mainCharacter = new MainCharacter(20, this.height - 250 - 20, 100, 250);
        var mainCharacterBackground = new Image();
        mainCharacterBackground.src = "http://clipartix.com/wp-content/uploads/2016/05/Clip-art-stick-figure-clipart-image.jpeg"; // Tmp test image
        this.mainCharacter.setBackground(mainCharacterBackground);
    }
}