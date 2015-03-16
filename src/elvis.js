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
