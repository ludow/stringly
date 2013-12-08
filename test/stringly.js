/*global describe:true,it:true */
'use strict';

var expect = require('chai').expect;
var stringly = require('../index.js');

describe('#always', function () {

  it('works with a simple example', function () {
    expect(stringly.always('yo yo', 'olo')).to.equal('yolo yolo');
  });

  describe('with a pattern reference (index & length)', function() {

    it('must respect pattern reference', function () {
      expect(stringly.always('yo yo', 'olo', 1)).to.equal('yo yo');
      expect(stringly.always('yo yo', 'olo', 2)).to.equal('yolo yolo');
    });

    it('must have an `o` after every `ol`', function () {
      expect(stringly.always('yol', 'olo', 0, 2)).to.equal('yolo');
      expect(stringly.always('yolo', 'olo', 0, 2)).to.equal('yolo');
      expect(stringly.always('yoloo', 'olo', 0, 2)).to.equal('yoloo');
      expect(stringly.always('yola', 'olo', 0, 2)).to.equal('yoloa');
      expect(stringly.always('yolo ylo', 'olo', 0, 2)).to.equal('yolo ylo');
      expect(stringly.always('yololo', 'olo', 0, 2)).to.equal('yololo');
      expect(stringly.always('yolo yaalolo', 'olo', 0, 2)).to.equal('yolo yaalolo');
    });

    it('must have an `o` before every `lo`', function () {
      expect(stringly.always('ylo', 'olo', 1, 2)).to.equal('yolo');
      expect(stringly.always('yolo', 'olo', 1, 2)).to.equal('yolo');
      expect(stringly.always('yoolo', 'olo', 1, 2)).to.equal('yoolo');
      expect(stringly.always('yalo', 'olo', 1, 2)).to.equal('yaolo');
      expect(stringly.always('yolo ylo', 'olo', 1, 2)).to.equal('yolo yolo');
      expect(stringly.always('yololo', 'olo', 1, 2)).to.equal('yololo');
      expect(stringly.always('yolo yaalolo', 'olo', 1, 2)).to.equal('yolo yaaololo');
    });

  });

  describe('with exotics chars', function () {

    it('with a pattern matching multi occurence to replace', function () {
      var str = '«I love french quotes» & «I love chicken»';
      str = stringly.always(str,'«&nbsp;');
      expect(str).to.equal('«&nbsp;I love french quotes» & «&nbsp;I love chicken»');
      str = stringly.always(str,'&nbsp;»', -1);
      expect(str).to.equal('«&nbsp;I love french quotes&nbsp;» & «&nbsp;I love chicken&nbsp;»');
    });

  });

  describe('when developers make mistakes', function () {

    it('returns complete string with one char pattern', function () {
      expect(stringly.always('string','s')).to.equal('string');
    });

    it('returns complete string when index if out of pattern range', function () {
      expect(stringly.always('yo yo', 'olo', 3)).to.equal('yo yo');
      expect(stringly.always('you only live on', 'once', 4)).to.equal('you only live on');
    });

    it('works well even if length is too long', function () {
      expect(stringly.always('ylo ylo', 'olo', 1, 4)).to.equal('yolo yolo');
      expect(stringly.always('yolo yolo', 'olo', 1, 4)).to.equal('yolo yolo');
    });

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