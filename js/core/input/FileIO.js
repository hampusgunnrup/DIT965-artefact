'use strict';

/*
 * Simple class for handling files. 
 * It uses AJAX to retrieve a specified file from the server.
*/
class FileIO {
    constructor(file) {
        this.file = file;
        this.xml;
        
        var fileIO = this;
        this.xhttp = new XMLHttpRequest();
        this.xhttp.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) { // Here "this" refers to the xhttp object
                fileIO.xml = this.responseXML;
            }    
        };
    }
    
    /*
     * Sends the request to open the specified file.
    */
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
        if(this.xhttp.readyState == 4 && this.xhttp.status == 200 && this.xml != null && this.xml != undefined) {
            return this.xml.getElementsByTagName("strings")[0].getElementsByTagName(string)[0].childNodes[0].nodeValue;
        }
        return "";
    }
}
