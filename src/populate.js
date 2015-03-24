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
      var val = dest[prop]
        , newProp = evaluate(prop, src, match, false);
      if(newProp !== prop){
        delete dest[prop];
        prop = newProp;
      }
      switch(typeof val){
        case 'string':
          dest[prop] = val = evaluate(val, src, match, true);
          if(!prop || (!val && val !== 0 && val !== false)){
            delete dest[prop];
          }
          break;
        case 'object':
          populate(src, val, match);
          break;
        case 'function':
          dest[prop] = val();
      }
    }
  }
  return dest;
}

function evaluate(val, src, match, parse){
  if(typeof match === 'function'){
    val = val.replace(/(\$\d+)/, match);
  }
  if(33 === val.charCodeAt(0)){
    parse = !parse;
    val = val.substr(1);
  } 
  if(parse){
    val = getField(val.split('.'), src);
  }
  return val;
}
