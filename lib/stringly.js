(function () {

  'use strict';

  /*--------------------------------------------------------------------------*/

  var stringly = (function () {

    /**
     * Ensure that a substr is always followed or preceded by another.
     *
     * @param {String} str The string being checked.
     * @param {String} pattern The pattern to control.
     * @param {Integer} reference The index of the reference char in pattern.
     * @returns {String} Returns the controlled string.
     * @example
     *
     * stringly.always('«I love french quotes»','« ');
     * // => '« I love french quotes»'
     *
     * stringly.always('Is it right?',' ?', 1);
     * // => 'Is it right ?'
     */
    function always (str, pattern, reference) {

      // :-)
      if(pattern.length <= 1) return str;

      // if no reference index given, we use the first char
      reference = reference || 0;

      return str
        // first split by good pattern to preserve them
        .split(pattern)
        // Then split each part by reference char
        .map(function (part) {
          return part.split(pattern[reference]);
        })
        // reduce each part
        .reduce(function (a, b) {
          return a.concat(b);
        })
        // join by good pattern
        .join(pattern);

    }

    /**
     * Insert a substring within a string at the position given.
     *
     * @param {String} str The string being modified.
     * @param {String} substr The substring to insert.
     * @param {Integer} index The insertion position.
     * @returns {String} Returns the modified string.
     * @example
     *
     * stringly.insertAt('My cat',' is black.', 6);
     * // => 'My cat is black.'
     */

    function insertAt (str, substr, index) {
      return [str.substring(0, index), substr, str.substring(index)].join('');
    }


    /**
     * Surround a string with another strings. If only one another string is
     * specified, it will be used on both sides.
     *
     * @param {String} str The string to surround.
     * @param {String} left The string added to the left
     * @param {String} right The string added to the right
     * @returns {String} Returns the surrounded string.
     * @example
     *
     * stringly.surround('foo','<p>','</p>');
     * // => '<p>foo</p>'
     *
     * stringly.surround('foo','%');
     * // => '%foo%'
     */

    function surround (str, left, right) {
      return [left, str, right || left].join('');
    }

    /*------------------------------------------------------------------------*/

    // expose stringly API
    var stringly = {};

    stringly.always = always;
    stringly.insertAt = insertAt;
    stringly.surround = surround;

    return stringly;

  })();

  /*--------------------------------------------------------------------------*/

  // expose Stringly

  // As an anonymous module with AMD.
  if (typeof define === 'function' && typeof define.amd === 'object') {
    define(function () {
      return stringly;
    });
  }

  // As a CommonJS module
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = stringly;

    exports.stringly = stringly;
  }

}.call(this));