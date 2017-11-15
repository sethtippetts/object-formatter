'use strict'
/**
 * Populates a new copy of the mapping object formatted data
 *
 * @param  {Object}   src       Source object to be parsed. Should match values in the destination object supplied in the constructor
 * @param  {Array}    vars      (Optional) Array of variables to be replaced in matching strings (I.E. ['foo','bar'] + "$2.$1-$1" => "bar.foo-foo")
 * @return {Object}             Destination object populated with source values
 */
/**
 * Constructor
 * @param {Object}    map       Destination object with dot-notated values referencing properties in the source object
 */
class Formatter {
  constructor (map) {
    this.formatMap = JSON.stringify(map)
  }
  format (src, vars) {
    return populate(src, JSON.parse(this.formatMap), vars && function (m) {
      const val = vars[parseInt(m.substr(1)) - 1]
      return val === void 0 ? '' : val
    })
  }
  static get (props, obj) {
    if (typeof props === 'string') {
      props = props.split('.')
    }
    return getField(props, obj)
  }
}

/**
 * Gets the dot-notated field from an object. Null safe.
 *
 * @param  {Array}    props     Array of properties in nested order.
 * @param  {Object}   obj       Source object to searchj.
 * @return {Object}             Value found from search or undefined.
 */
function getField (props, obj) {
  if (typeof obj === 'object') {
    const prop = props.shift()
    return props.length === 0 ? obj[prop] : getField(props, obj[prop])
  }
}

/**
 * Fills object with dot-notated properties of another object
 * Removes dest properties when src.prop is undefined
 *
 * @param  {Object}   src     Source object
 * @param  {Object}   dest    Destination object
 * @return {Object}           Destination object populated with source values
 */
function populate (src, dest, match) {
  for (let prop in dest) {
    if (dest.hasOwnProperty(prop)) {
      let val = dest[prop]
      const newProp = evaluate(prop, src, match, false)
      if (newProp !== prop) {
        delete dest[prop]
        prop = newProp
      }
      switch (typeof val) {
        case 'string':
          dest[prop] = val = evaluate(val, src, match, true)
          if (!prop || (!val && val !== 0 && val !== false)) {
            delete dest[prop]
          }
          break
        case 'object':
          populate(src, val, match)
          break
        case 'function':
          dest[prop] = val()
      }
    }
  }
  return dest
}

function evaluate (val, src, match, parse) {
  if (typeof match === 'function') {
    val = val.replace(/(\$\d+)/, match)
  }
  if (val.charCodeAt(0) === 33) {
    parse = !parse
    val = val.substr(1)
  }
  if (parse) {
    val = getField(val.split('.'), src)
  }
  return val
}

module.exports = Formatter
