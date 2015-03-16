/**
 * Constructor
 * @param {Object}    map       Destination object with dot-notated values referencing properties in the source object
 */
var Formatter = function(map){
  this.formatMap = JSON.stringify(map);
};
