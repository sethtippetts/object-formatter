
'use strict'
/**
 * Constructor
 * @param {Object}    map       Destination object with dot-notated values referencing properties in the source object
 */
var Formatter = function(map){
  this.formatMap = JSON.stringify(map);
};

/**
 * Populates a new copy of the mapping object formatted data
 * 
 * @param  {Object}   src       Source object to be parsed. Should match values in the destination object supplied in the constructor
 * @param  {Array}    vars      (Optional) Array of variables to be replaced in matching strings (I.E. ['foo','bar'] + "$2.$1-$1" => "bar.foo-foo")
 * @return {Object}             Destination object populated with source values
 */
Formatter.prototype.format = function(src, vars){
  return populate(src, JSON.parse(this.formatMap), vars && function(m){
    return vars[parseInt(m.substr(1))-1];
  });
};

/**
 * Fills object with dot-notated properties of another object
 * Removes dest properties when src.prop is undefined
 * 
 * @param  {Object}   src     Source object
 * @param  {Object}   dest    Destination object
 * @return {Object}           Destination object populated with source values
 */
function populate(src,dest,match){
  for (var prop in dest){
    if(dest.hasOwnProperty(prop)){
      var val = dest[prop];
      switch(typeof val){
        case 'string':
          if(typeof match === 'function'){
            val = val.replace(/(\$\d+)/, match);
          }
          var newVal = ((prop.charCodeAt(0) === 33 && (dest[prop.substr(1)] = val)) || (dest[prop] = Formatter.get(val.split('.'), src))), type = typeof newVal;
          if(!newVal && type !== 'boolean' && type !== 'number'){
            delete dest[prop];
          }
          break;
        case 'object':
          populate(src, dest[prop], match);
          break;
        case 'function':
          dest[prop] = val();
      }
    }
  }
  return dest;
}

/**
 * Gets the dot-notated field from an object. Null safe.
 * 
 * @param  {Array}    props     Array of properties in nested order.
 * @param  {Object}   obj       Source object to searchj.
 * @return {Object}             Value found from search or undefined.
 */
function getField(props, obj){
  if(typeof obj === 'object'){
    var prop = props.shift();
    return props.length===0?obj[prop]:getField(props, obj[prop]);
  }
}
Formatter.get = function(props, obj){
  if(typeof props === 'string'){
    props = props.split('.');
  }
  return getField(props,obj);
};
module.exports = Formatter;