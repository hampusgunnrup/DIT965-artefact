'use strict';

class MenuScreen extends Screen {
    constructor(game) {
        super(game);
        this.background = "#000";
        
        this.scenarioOneButton = new Button(0, 0, 100, 50, "Scenario 1", function(button) {
            game.setScreen(new ScenarioOneScreen(game));  
        });
        this.scenarioTwoButton = new Button(150, 0, 100, 50, "Scenario 2", function(button) {
            game.setScreen(new ScenarioTwoScreen(game));
        });
        this.addObject(this.scenarioOneButton);
        this.addObject(this.scenarioTwoButton);
    }
    
    update(deltaTime) {
        super.update(deltaTime);
    }
    
    display() {
        super.display();
        this.drawButton(this.scenarioOneButton);
        this.drawButton(this.scenarioTwoButton);
    }
    
    drawButton(button) {
        this.graphics.drawParagraph(button.getX(), button.getY()+20, button.getText());
    }
}