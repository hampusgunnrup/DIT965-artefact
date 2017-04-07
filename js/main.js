'use strict'                                                   // To disallow global variables

window.onload = function() {                                   // When all of the document(including scripts) have been loaded
    var htmlCanvas = document.getElementById("platform");      // Get the canvas(area to draw on)
    htmlCanvas.width = window.innerWidth;
    htmlCanvas.height = window.innerHeight;

    console.log(document.body.clientHeight);
   
    var canvas = new Canvas(htmlCanvas);                       // Create a new instance for handling the canvas            
    
    var game = new Game(canvas);                               // Create a new Game instance
    var screen = new ScenarioOneScreen(game);                         // Create a new GameScreen instance
    game.setScreen(screen);                                    // Set the initial screen
    
    var startTime = Date.now();                                // Get the initial start time
    setInterval(
		function() {                                           // The main game loop starts here(everything within the function)
		    var deltaTime = (Date.now() - startTime) / 1000;   // The time between the last iteration and now
		    startTime = Date.now();                            // Reset the start time
		    
		    game.getCurrentScreen().update(Number(deltaTime)); // Update the currently selected screen
		    game.getCurrentScreen().display();                 // Display the updated screen
		},
		30                                                     // Run the contents of the loop every 30 milliseconds
	);
}