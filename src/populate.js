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
          if(match){
            val = val.replace(/(\$\d+)/, match);
          }
          if((prop.charCodeAt(0) === 33 && (dest[prop.substr(1)] = val)) || typeof (dest[prop] = getField(val.split('.'), src)) === 'undefined'){
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
