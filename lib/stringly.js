(function () {

  'use strict';

  /*--------------------------------------------------------------------------*/

  var stringly = (function () {

    /**
     * Ensure that a substr is always followed or preceded by another.
     *
     * @param {String} str The string being checked.
     * @param {String} substr The substring to control.
     * @param {String} searched The substring to check.
     * @param {Boolean} before Active checking before substr, after instead.
     * @returns {String} Returns the controlled string.
     * @example
     *
     * stringly.always('«I love french quotes»','«', ' ');
     * // => '« I love french quotes»'
     *
     * stringly.always('Is it right?','?', ' ', true);
     * // => 'Is it right ?'
     */

    function always (str, substr, searched, before) {

      var relatedIndex = !!before ? 1 : -1;
      var insertIdx = !!before ? 0 : 1;
      var insertPool = [];

      // it seems that loop is faster than indexOf.
      for (var i=str.length;i--;) {
        if (str[i] === substr && str[i + relatedIndex] !== searched) {
          insertPool.push(i);
        }
      }

      insertPool.forEach(function (index) {
        str = insertAt(str, searched, index + insertIdx);
      });

      return str;
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