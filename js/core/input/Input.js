'use strict';

/*
 * The input class handles all user interaction with the device.
 * It detects the input and puts in buffers. The buffers can then be fetched by other classes.
*/
class Input {
    /*
     * param element: the element to detect input on. This should be an html element.
    */
    constructor(element) {
        this.touchDown = false;
        this.touchEvents = new Array();
        this.touchEventsBuffer = new Array();
        
        var input = this;                              // Inside of the event handlers "this" refers to the element. Hence, the input variable
        element.onmousedown = function(event) {
            input.touchDown = true;
        }
        
        element.onmouseup = function(event) {
            input.touchDown = false;
            var touchX = event.x - element.offsetLeft; // The passed in elements offset is removed since the x and y has its origin outside of the element
            var touchY = event.y - element.offsetTop;
            var touchEvent = {x: touchX, y:touchY};
            input.touchEventsBuffer.push(touchEvent);
        }
    }
    
    /*
      * Returns true if the user is clicking or touching down(i.e. they have not released the touch yet). 
     */
    isTouchDown() {
        return this.touchDown;
    }
    
    /*
     * Returns an array of the currently captured touch or click events. Each item in the array contains an x and y position.
     * To retrieve the x and y position do getTouchEvents()[i].x and getTouchEvents()[i].y respectively, where i is the index of the event.
    */
    getTouchEvents() {
        this.touchEvents = [];                                                // Clear the touchEvents
        Array.prototype.push.apply(this.touchEvents, this.touchEventsBuffer); // Add the buffer to the touchEvents
        this.touchEventsBuffer = [];                                          // Clear the buffer
        return this.touchEvents;
    }
}