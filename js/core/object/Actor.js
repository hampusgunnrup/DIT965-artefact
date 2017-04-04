'use strict'

/* 
 * An Actor is an Object that can do something.
 * In other words, it can act as well as have properties.
*/
class Actor extends Object {
    walkLeft(steps) {
        this.x -= steps;
    }
    
    walkRight(steps) {
        this.x += steps;
    }
    
    walkDown(steps) {
        this.y += steps;
    }
    
    walkUp(steps) {
        this.y -= steps;
    }
    
    speak(sentence) {
        console.log(sentence);
    }
}