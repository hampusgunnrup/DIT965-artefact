'use strict';

/*
 * A class for handling the low level graphics.
 * It contains functions for clearing the screen, drawing a background and drawing an image/element.
*/
class Graphics {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.context = this.canvas.get2DContext();
        this.width = width;
        this.height = height;
    }
    
    clearScreen() {
        this.context.clearRect(0,0,this.width,this.height);
    }
    
    drawBackground(image) {
        this.context.drawImage(image, 0, 0, this.width, this.height);
    }
    
    drawElement(x, y, width, height, background) {
        if(background != undefined) {
            if(background instanceof Image) {
                this.context.drawImage(background, x, y, width, height);
            } else {
                this.context.fillStyle = background;
                this.context.fillRect(x, y, width, height);
            }
        }
    }
    
    drawRoundedSquare(x, y, width, height, color) {
        var curve = 20;
        
        this.context.beginPath();
        this.context.moveTo(x, y);                                                 // Start
        this.context.lineTo(x+width-curve, y);                                     // Move right
        this.context.quadraticCurveTo(x+width, y, x+width, y+curve);               // Curve down
        this.context.lineTo(x+width, y+height-curve);                              // Move down
        this.context.quadraticCurveTo(x+width, y+height, x+width-curve, y+height); // Curve left             
        this.context.lineTo(x+curve, y+height);                                    // Move left
        this.context.quadraticCurveTo(x, y+height, x, y+height-curve);             // Curve up
        this.context.lineTo(x, y+curve);                                           // Move up
        this.context.quadraticCurveTo(x, y, x+curve, y);                           // Curve right
        this.context.fillStyle = color;
        this.context.fill();
    }
    
    drawText(x, y, size, text, color) {
        this.context.fillStyle = color;
        this.context.font = size + "em " + "Courier New";
        this.context.fillText(text, x, y);
    }
    
    drawLine(fromX, fromY, toX, toY, color) {
        this.context.beginPath();
        this.context.moveTo(fromX, fromY);
        this.context.lineTo(toX, toY);
        this.context.strokeStyle = color;
        this.context.stroke();
    }
    
    drawH1(x, y, text) {
        this.drawText(x, y, 2, text, "#000");
        
        var textWidth = this.context.measureText(text).width;
        this.drawLine(x, y + 2, x + textWidth, y + 2);
    }

    getH1Size(text) {
        this.context.font = "2em Courier New";
        var size = {
            width: this.context.measureText(text).width, 
            height: this.context.measureText("M").width + 2 // The closest you can get to height
        };
    
        return size;    
    }
    
    drawH2(x, y, text) {
        this.drawText(x, y, 1.2, text, "#000");
    }
    
    drawParagraph(x, y, text) {
        this.drawText(x, y, 1, text, "#222");
    }
    
    drawSpeachBubble(x, y, width, height, color) {
        var curve = 20;
        var pointSize = 15;
        
        this.setBlur("#ADD8E6");
        
        this.context.beginPath();
        this.context.moveTo(x+curve, y);                                                 // Start
        this.context.lineTo(x+width-curve, y);                                     // Move right
        this.context.quadraticCurveTo(x+width, y, x+width, y+curve);               // Curve down
        this.context.lineTo(x+width, y+height-curve);                              // Move down
        this.context.quadraticCurveTo(x+width, y+height, x+width-curve, y+height); // Curve left
        
        this.context.lineTo(x+curve+curve, y+height);
        this.context.lineTo(x+curve, y+height+pointSize);
        
        this.context.lineTo(x+curve, y+height);                                    // Move left
        this.context.quadraticCurveTo(x, y+height, x, y+height-curve);             // Curve up
        this.context.lineTo(x, y+curve);                                           // Move up
        this.context.quadraticCurveTo(x, y, x+curve, y);                           // Curve right
        this.context.fillStyle = color;
        this.context.strokeStyle = "#000";
        this.context.lineWidth = "2";
        this.context.fill();
        this.context.stroke();
    }
    
    setBlur(color) {
        this.context.shadowBlur = 70;
        this.context.shadowColor = color;
    }
}
