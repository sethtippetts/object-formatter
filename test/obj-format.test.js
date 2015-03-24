/* global describe, it */

var expect = require('chai').expect;

var Formatter = require('../build/obj-format')
  , destMap = {
    id__c: 'account_no',
    '!person.name.first': 'person',
    friends: 'person.friends',
    firstName__c: '!$2 is great',
    middleName: 'person.name.middle',
    lastName__c: '!person.name.last',
    address__c: {
      state__c: 'address.state',
      geo__c: {
        lat__c: 'address.$1.lat',
        long__c: 'address.$1.lng'
      }
    },
    address_street__c: 'address.street',
    phone_number__c: 'person.phone'
  }
  , testSrc = {
    account_no: 80102342,
    address: {
      street: '1234 Sesame Street',
      state: 'NY',
      zip: '90210',
      geo: {
        lat: -1.2345,
        lng: 1.2345
      }
    },
    person: {
      name: {
        first: 'John',
        middle: '',
        last: 'Zoidberg'
      },
      friends: []
    },
    email: 'test@example.com'
  };

describe('Object Formatter', function(){
  describe('#constructor', function(){
    it('should stringify an object', function(){
      var fmt = new Formatter(destMap);
      expect(fmt.formatMap).to.equal(JSON.stringify(destMap));
    });
  });
  describe('#format()', function(){
    var fmt = new Formatter(destMap);
    var dest = fmt.format(testSrc, ['geo','Example User']);
    it('should map nested values', function(){
      expect(dest.address__c.geo__c.long__c).to.equal(1.2345);
      expect(dest.address__c.state__c).to.equal('NY');
    });
    it('should replace $n variables', function(){
      expect(dest.address__c.geo__c.long__c).to.equal(1.2345);
      expect(dest.firstName__c).to.equal('Example User is great');
    });
    it('should pass through properties prefixed with "!"', function(){
      expect(dest.lastName__c).to.equal('person.name.last');
    });
    it('should remove undefined properties', function(){
      expect(dest).not.to.have.property('phone_number__c');
    });
    it('should remove empty strings', function(){
      expect(dest).not.to.have.property('middleName');
    });
    it('should replace destination properties prefixed with "!"', function(){
      expect(dest).to.have.property('John');
    });
  });
  describe('#get()', function(){
    var elvis = Formatter.get;
    it('should return nested values', function(){
      expect(elvis('address.geo.lat', testSrc)).to.equal(-1.2345);
    });
    it('should return undefined any part of the chain isn\'t an object', function(){
      expect(elvis('person.name.first.letter', testSrc)).to.be.an('undefined');
      expect(elvis('badprop', testSrc)).to.be.an('undefined');
      expect(elvis('address.lat', testSrc)).to.be.an('undefined');
    });
  });
});


