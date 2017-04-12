'use strict';

class TaskWindow {
    constructor(width, height, wrapper) {
        this.wrapper = wrapper;
        this.width = width;
        this.height = height;
        this.tasks = new Array();
        this.index = -1;
    }
    
    addTask(text) {
        /* Create the div and append it */
        var div = document.createElement("div");
        div.innerHTML = text;
        this.wrapper.appendChild(div);
        div.className = "task";
        
        this.tasks.push(div);
        this.index++;
        return this.index;
    }
    
    display() {
       // this.wrapper.style.width = this.width -5 + "px";
        //this.wrapper.style.height = this.height + "px";
        for(var i = 0; i <this.tasks.length; i++) { // Loop through all of the tasks
            
        }
    }
}