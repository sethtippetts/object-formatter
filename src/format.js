/**
 * Populates a new copy of the mapping object formatted data
 *
 * @param  {Object}   src       Source object to be parsed. Should match values in the destination object supplied in the constructor
 * @param  {Array}    vars      (Optional) Array of variables to be replaced in matching strings (I.E. ['foo','bar'] + "$2.$1-$1" => "bar.foo-foo")
 * @return {Object}             Destination object populated with source values
 */
Formatter.prototype.format = function(src, vars){
  return populate(src, JSON.parse(this.formatMap), vars && function(m){
    var val = vars[parseInt(m.substr(1))-1];
    return val===void 0?'':val;
  });
};
