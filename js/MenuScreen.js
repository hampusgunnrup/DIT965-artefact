'use strict';

class MenuScreen extends Screen {
    constructor(game) {
        super(game);
        
        this.buttonIsShown = false;
        this.graphics.setBlur("#000");
        this.background.src = "img/houseKim.png";
        this.game.taskWindow.reset(function() {});
    }
    
    update(deltaTime) {
        super.update(deltaTime);
        this.game.taskWindow.setEmptyText(this.game.getString("taskWindow/noTasks"));
    }
    
    display() {
        super.display();
        if(this.game.fileIsReady() && !this.buttonIsShown) {
            var button = document.createElement("div");
            button.className = "continueButton";
            button.innerHTML = this.game.file.getString("common/begin");
            document.body.appendChild(button);

            var game = this.game;
            button.onmousedown = function() {
                game.setScreen(new ScenarioOneScreen(game));
                this.remove();
            };
            
            this.buttonIsShown = true;
        }
    }
}
