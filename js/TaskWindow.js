'use strict';

class TaskWindow {
    constructor(width, height, wrapper, game) {
        this.game = game;
        this.wrapper = wrapper;
        this.width = width;
        this.height = height;
        this.tasks = new Array();
        this.index = -1;
        this.isPlaying = false;
        this.activeTaskIndex = 0;
    }
    
    addTask(text, audio) {
        /* Create the html elements */
        var div = document.createElement("div");
        var span = document.createElement("span");
        var speaker = document.createElement("div");
        span.innerHTML = text;
        
        /* Set the classes */
        div.className = "task";
        speaker.className = "speaker";
        
        /* Append the elements */
        div.appendChild(span);
        div.appendChild(speaker);
        this.wrapper.appendChild(div);
        
        var audio = new Audio(audio); // Create a new audio instance(for when the task is clicked)
        var taskWindow = this;        // Within the onmousedown event, this refers to the div, therefore we need to save reference in a new variable
        
        div.onmousedown = function() {
            if(!taskWindow.isPlaying && div.classList.contains("activeTask")) {
                taskWindow.isPlaying = true;
                this.style.backgroundColor = "#FFF082";
                speaker.style.display = "inline"
                audio.play();
            }
        }
        
        audio.onended = function() {
            speaker.style.display = "none";
            taskWindow.isPlaying = false;
        }
        
        if(taskWindow.wrapper.firstChild === div) { // Only the first task should be clickable
            div.classList.add("activeTask");
        }
        
        this.tasks.push(div);
        this.index++;
        return this.index;
    }
    
    /*
     * Removes all of the tasks from the taskwindow
    */
    reset() {
        for(var i = 0; i < this.tasks.length; i++)
            this.wrapper.removeChild(this.tasks[i]);
    }
    
    /*
     * Completes the currently active task, and unlocks the next task.
    */
    completeTask() {
        if(this.activeTaskIndex < this.tasks.length) {
            this.tasks[this.activeTaskIndex].classList.remove("activeTask");
            this.tasks[this.activeTaskIndex].classList.add("doneTask");
            this.activeTaskIndex++;
            this.tasks[this.activeTaskIndex].classList.add("activeTask");
        }
    }
    
    isPlaying() {
        return this.isPlaying;
    }
}