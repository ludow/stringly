/*global describe:true,it:true */
'use strict';

var expect = require('chai').expect;
var stringly = require('../index.js');

describe('#always', function () {

  // useless but just checking it works !
  it('with only one char pattern', function () {
    expect(stringly.always('string','s')).to.equal('string');
  });

  it('with a pattern matching multi occurence to replace', function () {
    var str = '«I love french quotes» & «I love chicken»';
    str = stringly.always(str,'« ');
    expect(str).to.equal('« I love french quotes» & « I love chicken»');
    str = stringly.always(str,' »', 1);
    expect(str).to.equal('« I love french quotes » & « I love chicken »');
  });

  it('with two chars pattern', function () {
    var str = '«I love french quotes»';
    str = stringly.always(str,' »', 1);
    expect(str).to.equal('«I love french quotes »');
    str = stringly.always(str,'« ');
    expect(str).to.equal('« I love french quotes »');
  });

  it('with a longest pattern matching', function () {
    expect(stringly.always('yo yo', 'olo')).to.equal('yolo yolo');
    expect(stringly.always('yo yo', 'olo', 1)).to.equal('yo yo');
    expect(stringly.always('yo yo', 'olo', 2)).to.equal('yolo yolo');
  });

});

describe('#insertAt', function () {

  it('with simple example', function () {
    expect(stringly.insertAt('My cat',' is black.', 6)).to.equal('My cat is black.');
  });

});

describe('#surround', function () {

  it('with one char', function () {
    expect(stringly.surround('foo','%')).to.equal('%foo%');
  });

  it('with one substring', function () {
    expect(stringly.surround('foo','%%')).to.equal('%%foo%%');
  });

  it('with two differents chars', function () {
    expect(stringly.surround('foo','%', '$')).to.equal('%foo$');
  });

  it('with two differents substrings', function () {
    expect(stringly.surround('foo','« ', ' »')).to.equal('« foo »');
  });

});