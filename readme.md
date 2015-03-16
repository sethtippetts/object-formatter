# Object Formatter

Of course your objects are formatted nicely internally. You wrote the code, and you're a genius. But wait! Evil 3rd party API says your objects are crap, and they want them formatted THE RIGHT (their) WAY!

Never fear, Object Formatter™ is here!

### Show me how to use it already!

#### Creating a Formatter instance:
```
var Formatter = require('object-formatter');
var destMap = {
  "!project_name": "$1",
  "project_id": "$2.id",
  "first_name": "person.first",
  "last_name": "person.last",
  "address": {
    "geo": {
      "lat": "person.address.geo.lat"
    }
  },
  "!ip_address": "127.0.0.1"
}
var THIRD_PARTY_FORMAT = new Formatter(destMap);
```

A property with a `!` prefix will be ignored by the object-looker-upper (elvis operator).

Any value containing a `$n` will be replaced with its corresponding variable in the array you pass before property lookup.

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
  "project_name": "Finance",
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

### Worried about `undefined`? Worry no longer!

Object Formatter takes all the worry out of property lookups. You're welcome.

### Problems, issues, rude remarks?
Send me an email at sethtippetts@gmail.com, or die in a hole! Whichever comes first!
