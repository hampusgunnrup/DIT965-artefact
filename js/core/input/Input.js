'use strict';

class Input {
    constructor(element) {
        this.touchDown = false;
        this.touchEvents = new Array();
        this.touchEventsBuffer = new Array();
        
        var input = this;                                                     // Cannot access this inside of the event handlers
        element.onmousedown = function(event) {
            input.touchDown = true;
        }
        
        element.onmouseup = function(event) {
            input.touchDown = false;
            var touchX = event.x - element.offsetLeft;
            var touchY = event.y - element.offsetTop;
            var touchEvent = {x: touchX, y:touchY};
            input.touchEventsBuffer.push(touchEvent);
        }
    }
    
    isTouchDown() {
        return this.touchDown;
    }
    
    getTouchEvents() {
        this.touchEvents = [];
        Array.prototype.push.apply(this.touchEvents, this.touchEventsBuffer); // Merge the buffer into the touchEvents
        this.touchEventsBuffer = [];
        return this.touchEvents;
    }
}