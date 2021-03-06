"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMap = void 0;

var _function = require("../../utils/function.js");

var _factory = require("../../utils/factory.js");

var name = 'map';
var dependencies = ['typed'];
var createMap = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed;

  /**
   * Create a new matrix or array with the results of the callback function executed on
   * each entry of the matrix/array.
   *
   * Syntax:
   *
   *    math.map(x, callback)
   *
   * Examples:
   *
   *    math.map([1, 2, 3], function(value) {
   *      return value * value
   *    })  // returns [1, 4, 9]
   *
   * See also:
   *
   *    filter, forEach, sort
   *
   * @param {Matrix | Array} x    The matrix to iterate on.
   * @param {Function} callback   The callback method is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the matrix being traversed.
   * @return {Matrix | array}     Transformed map of x
   */
  return typed(name, {
    'Array, function': _map,
    'Matrix, function': function MatrixFunction(x, callback) {
      return x.map(callback);
    }
  });
});
/**
 * Map for a multi dimensional array
 * @param {Array} array
 * @param {Function} callback
 * @return {Array}
 * @private
 */

exports.createMap = createMap;

function _map(array, callback) {
  // figure out what number of arguments the callback function expects
  var args = (0, _function.maxArgumentCount)(callback);

  var recurse = function recurse(value, index) {
    if (Array.isArray(value)) {
      return value.map(function (child, i) {
        // we create a copy of the index array and append the new index value
        return recurse(child, index.concat(i));
      });
    } else {
      // invoke the callback function with the right number of arguments
      if (args === 1) {
        return callback(value);
      } else if (args === 2) {
        return callback(value, index);
      } else {
        // 3 or -1
        return callback(value, index, array);
      }
    }
  };

  return recurse(array, []);
}