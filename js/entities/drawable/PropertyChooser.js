'use strict';

class PropertyChooser {
    constructor() {
        this.options = new Array();
        this.choice = -1;
        this.chosen = false;
        
        this.wrapper = document.createElement("div");
        this.wrapper.classList.add("propertyChooserWrapper");
        this.wrapper.style.display = "none";
        
        this.flex = document.createElement("div");
        this.flex.classList.add("propertyChooserFlex");
        
        this.wrapper.appendChild(this.flex);
        document.body.appendChild(this.wrapper);
    }
    
    show() {
        this.wrapper.style.display = "inline";
    }
    
    hide() {
        this.wrapper.style.display = "none";
    }
    
    /*
     * Takes in a javascript object, with the key being the text and the value being a link to an image.
    */
    setOptions(object) {
        for(var key in object) {
            var div = document.createElement("div");
            div.style.backgroundImage = "url('" + object[key] + "')";
            this.flex.appendChild(div);
            
            var propertyChooser = this;
            div.onmousedown = function() {
                var i = 0;
                var child = this;
                while((child = child.previousSibling) != null) 
                    i++;
                propertyChooser.choice = i + 1;
                propertyChooser.hide();
                propertyChooser.chosen = true;
            }
        }
    }
    
    reset() {
        /* An alternative would be to do: this.wrapper.innerHTML = ''; */
        /* However, acording to https://jsperf.com/innerhtml-vs-removechild, this method performs much better. */
        while(this.flex.firstChild) { // While there is a first child
            this.flex.removeChild(this.flex.firstChild); // Remove the first child
        }
        
        this.chosen = false;
    }
    
    getChoice() {
        return this.choice;
    }
    
    hasChosen() {
        return this.chosen;
    }
}