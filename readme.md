# Object Formatter [![NPM version](https://img.shields.io/npm/v/obj-format.svg)](https://www.npmjs.org/package/obj-format) [![Build Status](https://travis-ci.org/SethTippetts/object-formatter.svg?branch=master)](https://travis-ci.org/SethTippetts/object-formatter)

Of course your objects are formatted nicely internally. You wrote the code, and you're a genius. But wait! Evil 3rd party API says your objects are crap, and they want them formatted THE RIGHT (their) WAY!

Never fear, Object Formatter™ is here!

## Show me how to use it already!

### Installation

```sh
$ npm install obj-format
```

#### Creating a Formatter instance:
```
const Formatter = require('object-formatter');
/* Note: You can totally store your maps as JSON files and require them.
 * Like cloth diapers, JSON mapping files are nice, tidy, and reusable! */
const destMap = {

  // Value is replaced by variable and ignored from object search
  project_name: "!$1 is great!",

  // Search property is replaced with supplied variables
  "project_id": "$2.id",
  "first_name": "person.first",
  "last_name": "person.last",
  "address": {
    "geo": {
      "lat": "person.address.geo.lat"
    }
  },

  // Value ignored by parser
  "!ip_address": "127.0.0.1"
}
const THIRD_PARTY_FORMAT = new Formatter(destMap);
```
#### Default Behavior

Properties are not parsed by the object-looker-upper (elvis operator).

Values are parsed by the object-looker-upper (Really? Can't think of better name?).

Any property or value containing a `$n` will be replaced with its corresponding variable in the array you pass before property lookup.

#### Negating default behavior

Maybe you want a property to be a value from a source object, or maybe you want a constant string as a value. Just prefix your property or value with `!` and the default behavior will be reversed!

#### Using the formatter
```
THIRD_PARTY_FORMAT.format({
  person: {
    first: 'John',
    last: 'Zoidberg',
    address: {
      street: '1234 Example Blvd',
      geo: {
        lat: 1.2345
        lng: -1.2345
      }
    }
  },
  finance: {
    id: 123,
    name: 'Finance',
    date: new Date()
  }
}, ['Finance', 'finance']);

/*
Returns:
{
  "project_name": "Finance is great!",
  "project_id": "123",
  "first_name": "John",
  "last_name": "Zoidberg",
  "address": {
    "geo": {
      "lat": "1.2345"
    }
  },
  "ip_address": "127.0.0.1"
}
*/
```

### Methods

##### `format(obj, vars)` _instance method_

Populates a new copy of the mapping object formatted data

###### Arguments
- `obj` - Source object to be parsed. Should match values in the destination object supplied in the constructor
- `vars` - (Optional) Array of variables to be replaced in matching strings (I.E. `['foo','bar'] + "$2.$1-$1"` => `"bar.foo-foo"`)

###### Returns
Destination object populated with source values

##### `get(props, obj)` _class method_
Class method. Gets the property array or dot-notated field from an object. Null safe.

###### Arguments
- `props`     Array of properties in nested order or dot notated string (I.E. `["foo", "bar", "baz"]` OR `"foo.bar.baz"`)
- `obj`       Source object to search.

###### Returns
Value found from search or undefined.

### Worried about `undefined`? Worry no longer!

Object Formatter takes all the worry out of property lookups. You're welcome.

### Problems? Issues? Rude remarks?
Send me an email at sethtippetts@gmail.com, or die in a hole! Whichever comes first!
