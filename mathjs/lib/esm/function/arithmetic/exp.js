import { factory } from '../../utils/factory.js';
import { deepMap } from '../../utils/collection.js';
import { expNumber } from '../../plain/number/index.js';
var name = 'exp';
var dependencies = ['typed'];
export var createExp = /* #__PURE__ */factory(name, dependencies, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Calculate the exponent of a value.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.exp(x)
   *
   * Examples:
   *
   *    math.exp(2)                  // returns number 7.3890560989306495
   *    math.pow(math.e, 2)          // returns number 7.3890560989306495
   *    math.log(math.exp(2))        // returns number 2
   *
   *    math.exp([1, 2, 3])
   *    // returns Array [
   *    //   2.718281828459045,
   *    //   7.3890560989306495,
   *    //   20.085536923187668
   *    // ]
   *
   * See also:
   *
   *    expm1, log, pow
   *
   * @param {number | BigNumber | Complex | Array | Matrix} x  A number or matrix to exponentiate
   * @return {number | BigNumber | Complex | Array | Matrix} Exponent of `x`
   */
  return typed(name, {
    number: expNumber,
    Complex: function Complex(x) {
      return x.exp();
    },
    BigNumber: function BigNumber(x) {
      return x.exp();
    },
    'Array | Matrix': function ArrayMatrix(x) {
      // TODO: exp(sparse) should return a dense matrix since exp(0)==1
      return deepMap(x, this);
    }
  });
});