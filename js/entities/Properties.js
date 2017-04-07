'use strict'

class Properties extends Object {
    constructor(actor) {
        var width = 200;
        var height = actor.getHeight();
        super(0, 0, width, height);
        this.actor = actor;
        this.setBackground("#ECE63D"); // Remove this when drawRoundedSquare is fixed
    }
    
    update(deltaTime, maxX, maxY) {
        super.update(deltaTime, maxX, maxY);
        this.x = this.actor.getX() + this.actor.getWidth();
        this.y = this.actor.getY();
    }
    
    draw(graphics) {
        //graphics.drawRoundedSquare(this.x, this.y, this.width, this.height); // Fix this method
        
        var width = this.width;
        var H1Size = graphics.getH1Size("Properties");
        var H1X = this.x + width/2 - H1Size.width/2;
        var H1Y = this.y + H1Size.height;
        
        graphics.drawH1(H1X, H1Y, "Properties");

        var x = H1X;
        var y = H1Y;
        this.actor.properties.forEach(function(value, key, map) {
            y += H1Size.height + 5;
            graphics.drawH2(x, y, key + ":");
            graphics.drawParagraph(x + width/2, y, value);
        });
    }
}