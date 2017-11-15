/* global describe, it */
'use strict'

const expect = require('chai').expect

const Formatter = require('../Formatter')
const fixtures = require('./fixtures.json')
const destMap = fixtures.destMap
const testSrc = fixtures.testSrc

describe('Object Formatter', function () {
  describe('#constructor', function () {
    it('should stringify an object', function () {
      const fmt = new Formatter(destMap)
      expect(fmt.formatMap).to.equal(JSON.stringify(destMap))
    })
  })
  describe('#format()', function () {
    const fmt = new Formatter(destMap)
    const dest = fmt.format(testSrc, ['geo', 'Example User'])
    it('should map nested values', function () {
      expect(dest.address__c.geo__c.long__c).to.equal(1.2345)
      expect(dest.address__c.state__c).to.equal('NY')
    })
    it('should replace $n variables', function () {
      expect(dest.address__c.geo__c.long__c).to.equal(1.2345)
      expect(dest.firstName__c).to.equal('Example User is great')
    })
    it('should pass through properties prefixed with "!"', function () {
      expect(dest.lastName__c).to.equal('person.name.last')
    })
    it('should remove undefined properties', function () {
      expect(dest).not.to.have.property('phone_number__c')
    })
    it('should remove undefined variables', function () {
      expect(dest).not.to.have.property('test__id')
    })
    it('should remove empty strings', function () {
      expect(dest).not.to.have.property('middleName')
    })
    it('should replace destination properties prefixed with "!"', function () {
      expect(dest).to.have.property('John')
    })
  })
  describe('#get()', function () {
    const elvis = Formatter.get
    it('should return nested values', function () {
      expect(elvis('address.geo.lat', testSrc)).to.equal(-1.2345)
    })
    it('should return undefined any part of the chain isn\'t an object', function () {
      expect(elvis('person.name.first.letter', testSrc)).to.be.an('undefined')
      expect(elvis('badprop', testSrc)).to.be.an('undefined')
      expect(elvis('address.lat', testSrc)).to.be.an('undefined')
    })
  })
})
