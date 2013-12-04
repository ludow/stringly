/*global describe:true,it:true */
'use strict';

var expect = require('chai').expect;
var stringly = require('../index.js');

describe('#always', function () {

  it('with simple example', function () {
    var str = '«I love french quotes»';
    str = stringly.always(str,'«', ' ');
    expect(str).to.equal('« I love french quotes»');
    str = stringly.always(str,'»', ' ', true);
    expect(str).to.equal('« I love french quotes »');
  });

  it('with multi matching', function () {
    expect(stringly.always('hooo', 'o', 'l')).to.equal('hololol');
    expect(stringly.always('hooo', 'o', 'l', true)).to.equal('hlololo');
    expect(stringly.always('hooo', 'o', 'o')).to.equal('hoooo');
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