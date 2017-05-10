'use strict';

class TaskWindow {
    constructor(width, height, wrapper) {
        this.func;
        this.wrapper = wrapper;
        this.width = width;
        this.height = height;
        this.tasks = new Array();
        this.index = -1;
        this.isPlaying = false;
        this.activeTaskIndex = 0;
        
        this.noTasks = document.createElement("span");
        this.noTasks.innerHTML = "";
        this.wrapper.appendChild(this.noTasks);
        this.currentAudio = null;
        
        /* Initialize a file with the textstrings for this game */
       // this.file = new FileIO("/assets/text.xml");
        //this.file.open();
    }
    
    addTask(text, audio) {
        if(this.noTasks.style.display !== "none")
            this.noTasks.style.display = "none";
        
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
                speaker.style.display = "inline"
                audio.play();
                taskWindow.currentAudio = audio;
            }
        }
        
        audio.onended = function() {
            speaker.style.display = "none";
            taskWindow.isPlaying = false;
        }
        
        if(this.wrapper.getElementsByTagName('div')[0] === div) { // Only the first task should be clickable(initially)
            div.classList.add("activeTask");
        }
        
        this.tasks.push(div);
        this.index++;
        return this.index;
    }
    
    /*
     * Removes all of the tasks from the taskwindow
    */
    reset(func) {
        this.func = func;
        
        for(var i = 0; i < this.tasks.length; i++)
            this.wrapper.removeChild(this.tasks[i]);
            
        this.tasks = new Array();
        this.activeTaskIndex = 0;
        this.index = -1;
        this.isPlaying = false;
        
        this.noTasks.style.display = "inline";
    }
    
    /*
     * Completes the currently active task, and unlocks the next task.
    */
    completeTask() {
        if(this.activeTaskIndex < this.tasks.length) {
            this.activeTaskIndex++;
            this.tasks[this.activeTaskIndex-1].classList.remove("activeTask");
            this.tasks[this.activeTaskIndex-1].classList.add("doneTask");
            if(this.activeTaskIndex < this.tasks.length) // Have to do this check again since the variable is incremented
                this.tasks[this.activeTaskIndex].classList.add("activeTask");
        }  
        
        if(this.activeTaskIndex == this.tasks.length) {
            var button = document.createElement("div");
            button.className = "continueButton";
            button.innerHTML = this.file.getString("taskWindow/continue");
            document.body.appendChild(button);

            var taskWindow = this;
            button.onmousedown = function() {
                if(taskWindow.func !== undefined && taskWindow.func !== null)
                    taskWindow.func();
                this.remove();
            };
        }
    }
    
    setEmptyText(text) {
        this.noTasks.innerHTML = text;
    }
    
    setFile(file) {
        this.file = file;
    }
    
    /*
     * Returns true if the the active task is playing audio.
    */
    isPlaying() {
        return this.isPlaying;
    }
    
    /*
     * Returns true if the passed in tasknumber is in the complete state.
    */
    isTaskDone(taskNumber) {
        return this.activeTaskIndex >= taskNumber; // If it is equal to the tasknumber, it is the index after the tasknumber
    }
    
    getCurrentAudio() {
        return this.currentAudio;
    }
}
