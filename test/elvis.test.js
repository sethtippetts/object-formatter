/* global describe, it */

var expect = require('chai').expect;

var elvis = require('../build/elvis')
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
        last: 'Zoidberg'
      }
    },
    email: 'test@example.com'
  };

describe('elvis()', function(){
  it('should return nested values', function(){
    expect(elvis(['address', 'geo', 'lat'], testSrc)).to.equal(-1.2345);
  });
  it('should return undefined any part of the chain isn\'t an object', function(){
    expect(elvis(['person', 'name', 'first', 'letter'], testSrc)).to.be.an('undefined');
    expect(elvis(['badprop'], testSrc)).to.be.an('undefined');
    expect(elvis(['address','lat'], testSrc)).to.be.an('undefined');
  });
});
