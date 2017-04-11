'use strict';

/* 
 * An Actor is an Object that can do something.
 * In other words, it can act as well as have properties.
*/
class Actor extends Object {
    /*
     * Make the actor walk left.
     * param steps: the amount of points (x) to walk
    */
    walkLeft(steps) {
        this.x -= steps;
    }
    
    /*
     * Make the actor walk right.
     * param steps: the amount of points (x) to walk
    */
    walkRight(steps) {
        this.x += steps;
    }
    
    /*
     * Make the actor walk down.
     * param steps: the amount of points (y) to walk
    */
    walkDown(steps) {
        this.y += steps;
    }
    
    /*
     * Make the actor walk up.
     * param steps: the amount of points (y) to walk
    */
    walkUp(steps) {
        this.y -= steps;
    }
    
    /*
     * Make the actor say a something. This is a template and does not contain any implementation.
     * Every actor that speaks in any way, should override this function. There is no need to call the super function.
     * param sentence: what the actor should say. This must be a string.
    */
    speak(sentence) {
    }
}