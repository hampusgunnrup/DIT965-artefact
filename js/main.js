'use strict';                                                  // To disallow global variables

window.onload = function() {                                   // When all of the document(including scripts) have been loaded
    var taskWrapper = document.getElementById("taskWrapper");
   
    var htmlCanvas = document.getElementById("platform");      // Get the canvas(area to draw on)
    
    htmlCanvas.width = 900;//window.innerWidth - taskWrapper.offsetWidth;
    htmlCanvas.height = 600;//window.innerHeight;
    
    var canvas = new Canvas(htmlCanvas);                       // Create a new instance for handling the canvas            
    
    var taskWindow = new TaskWindow(window.innerWidth * 0.2, window.innerHeight, taskWrapper); // Creates the task window
    
    var game = new OOPGame(canvas, taskWindow);                            // Create a new Game instance
    var screen = new MenuScreen(game);                         // Create a new GameScreen instance
    game.setScreen(screen);                                    // Set the initial screen
    
    var startTime = Date.now();                                // Get the initial start time
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    setInterval(
		function() {                                           // The main game loop starts here(everything within the function)
		    if(window.innerWidth >= 1120 && window.innerHeight >= 620) {
		        document.getElementById("smallScreenWindow").style.display = "none";
		    
    		    var deltaTime = (Date.now() - startTime) / 1000;   // The time between the last iteration and now
    		    startTime = Date.now();                            // Reset the start time
    		    
    		    game.getCurrentScreen().update(Number(deltaTime)); // Update the currently selected screen
    		    game.getCurrentScreen().display();                 // Display the updated screen
    		
    		    centerButton(htmlCanvas);
    		    positionPropertyChooser(htmlCanvas);
    		    console.log(window.innerHeight + ":" + window.innerWidth);
		    } else {
		        document.getElementById("smallScreenWindow").style.display = "inline";
		    }
		},
		30                                                     // Run the contents of the loop every 30 milliseconds
	);
}

function centerButton(htmlCanvas) {
    var button = document.getElementsByClassName("continueButton")[0];
    if(button !== undefined) {
        //if(windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) { // Window has resized
        var wrapperWidth = 1100;
        var wrapperHeight = 600;
        var buttonWidth = 300;
        var buttonHeight = 150;
    	if (window.innerWidth >= wrapperWidth && window.innerHeight >= wrapperHeight) { // If the wrapper fits the screen
    	    var canvasWidth = htmlCanvas.width;
    	    var canvasHeight = htmlCanvas.height;
    	    
    	    var spaceBefore = (window.innerWidth - wrapperWidth) / 2;
    	    var left = spaceBefore + canvasWidth / 2 - buttonWidth / 2 + "px"; // The horizontal center of the canvas
    	    
    	    var spaceAbove = 5; // The margin top
    	    var top = spaceAbove + canvasHeight / 2 - buttonHeight / 2  + "px"; // The vertical center of the canvas
        } else { // If the wrapper does not fit the screen
            // Center the button
            var left = window.innerWidth / 2 - buttonWidth / 2 + "px";
            var top = window.innerHeight / 2 - buttonHeight / 2 + "px";
        }
        button.style.left = left;
        button.style.top = top;
        
        //}
    }
}

function positionPropertyChooser(canvas) {
    var propertyChooser = document.getElementsByClassName("propertyChooserWrapper")[0];
    
    if(propertyChooser !== undefined) {
        var left = canvas.offsetLeft;
        propertyChooser.style.left = left + "px";
    }
}
