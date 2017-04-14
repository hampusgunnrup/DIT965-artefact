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
        this.scaleX = 1; // If no scale is set, then use this
        this.scaleY = 1; // It has no effect on the sizes
    }
    
    clearScreen() {
        this.context.clearRect(0,0,this.width,this.height);
    }
    
    drawBackground(background) {
        if(background instanceof Image) {
            this.context.drawImage(background, 0, 0, this.width, this.height);
        } else { // If the background is a color
            this.context.fillStyle = background;
            this.context.fillRect(0, 0, this.width, this.height);
        }
    }
    
    drawElement(x, y, width, height, background) {
        if(background != undefined) {
            if(background instanceof Image) {
                this.context.drawImage(background, x, y, width, height);
            } else { // If the background is a color
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
        this.context.font = "2em Courier New"; // Scale
        var size = {
            width: this.context.measureText(text).width, 
            height: this.context.measureText("M").width + 2 // The closest you can get to height
        };
    
        return size;    
    }
    
    drawH2(x, y, text) {
        this.drawText(x, y, 1.2, text, "#000");
    }
    
    getH2Size(text) {
        this.context.font = "1.2em Courier New";
        var size = {
            width: this.context.measureText(text).width, 
            height: this.context.measureText("M").width + 2 // The closest you can get to height
        };
    
        return size;    
    }
    
    drawParagraph(x, y, text) {
        this.drawText(x, y, 1, text, "#222");
    }
    
    getParagraphSize(text) {
        this.context.font = "1.2em Courier New";
        var size = {
            width: this.context.measureText(text).width, 
            height: this.context.measureText("M").width + 2 // The closest you can get to height
        };
    
        return size;    
    }
    
    drawSpeechBubble(x, y, width, height, color, text) {
        var curve = 20;
        var pointSize = 15;
        
        this.context.beginPath();
        this.context.moveTo(x+curve, y);                                           // Start
        this.context.lineTo(x+width-curve, y);                                     // Move right
        this.context.quadraticCurveTo(x+width, y, x+width, y+curve);               // Curve down
        this.context.lineTo(x+width, y+height-curve);                              // Move down
        this.context.quadraticCurveTo(x+width, y+height, x+width-curve, y+height); // Curve left
        
        /* Draw triangle part */
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
        
        /* Draw the text */
        var words = text.split(" ");                                               // Make an array of the text(each word)
        var currentWidth = 0;
        var spaceSize = this.getParagraphSize(" ").width;
        var wordX = x + spaceSize*2;
        var wordY = y + spaceSize + 5;

        for(var n = 0; n < words.length; n++) {                                    // For all words
            var word = words[n];
            var wordSize = this.getParagraphSize(word);
            
            if((wordX + wordSize.width) >= (x + width)) {                          // If the current sentence(i.e. sentences[i]) with the current word becomes to large
                wordY += wordSize.height + 5;                                      // Start a new line
                wordX = x + spaceSize*2;
            }
            
            this.drawParagraph(wordX, wordY, word);                                // Draw the actual word
            wordX += wordSize.width + spaceSize;                                   // Set the x for the next word
        }
    }
    
    setBlur(color) {
        this.context.shadowBlur = 20;
        this.context.shadowColor = color;
    }
    
    setScale(scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.context.scale(scaleX, scaleY);
    }
}
