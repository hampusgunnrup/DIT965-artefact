'use strict';

class FileIO {
    constructor(file) {
        this.file = file;
        this.xml;
        
        var fileIO = this;
        this.xhttp = new XMLHttpRequest();
        this.xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) { // In here "this" refers to the xhttp object
                fileIO.xml = this.responseXML;
            }    
        };
    }
    
    open() {
        this.xhttp.open('GET', this.file, true);
        this.xhttp.send();
    }
    
    /*
     * Gets the node value of the passed in tag.
     * param string: must be a string of characters.
     * note: the tag must not be nested
    */
    getUniqueNodeValue(string) {
        if(this.xhttp.readyState == 4 && this.xhttp.status == 200) {
            return this.xml.getElementsByTagName(string)[0].childNodes[0].nodeValue;
        }
        return "";
    }
}
