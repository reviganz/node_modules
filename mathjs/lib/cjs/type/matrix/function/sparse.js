"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSparse = void 0;

var _factory = require("../../../utils/factory.js");

var name = 'sparse';
var dependencies = ['typed', 'SparseMatrix'];
var createSparse = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var typed = _ref.typed,
      SparseMatrix = _ref.SparseMatrix;

  /**
   * Create a Sparse Matrix. The function creates a new `math.Matrix` object from
   * an `Array`. A Matrix has utility functions to manipulate the data in the
   * matrix, like getting the size and getting or setting values in the matrix.
   *
   * Syntax:
   *
   *    math.sparse()               // creates an empty sparse matrix.
   *    math.sparse(data)           // creates a sparse matrix with initial data.
   *    math.sparse(data, 'number') // creates a sparse matrix with initial data, number datatype.
   *
   * Examples:
   *
   *    let m = math.sparse([[1, 2], [3, 4]])
   *    m.size()                        // Array [2, 2]
   *    m.resize([3, 2], 5)
   *    m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
   *    m.get([1, 0])                    // number 3
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, number, string, unit, matrix
   *
   * @param {Array | Matrix} [data]    A two dimensional array
   *
   * @return {Matrix} The created matrix
   */
  return typed(name, {
    '': function _() {
      return new SparseMatrix([]);
    },
    string: function string(datatype) {
      return new SparseMatrix([], datatype);
    },
    'Array | Matrix': function ArrayMatrix(data) {
      return new SparseMatrix(data);
    },
    'Array | Matrix, string': function ArrayMatrixString(data, datatype) {
      return new SparseMatrix(data, datatype);
    }
  });
});
exports.createSparse = createSparse;