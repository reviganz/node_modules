<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function larger

Test whether value x is larger than y.

The function returns true when x is larger than y and the relative
difference between x and y is larger than the configured epsilon. The
function cannot be used to compare values smaller than approximately 2.22e-16.

For matrices, the function is evaluated element wise.
Strings are compared by their numerical value.


## Syntax

```js
math.larger(x, y)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; BigNumber &#124; Fraction &#124; boolean &#124; Unit &#124; string &#124; Array &#124; Matrix | First value to compare
`y` | number &#124; BigNumber &#124; Fraction &#124; boolean &#124; Unit &#124; string &#124; Array &#124; Matrix | Second value to compare

### Returns

Type | Description
---- | -----------
boolean &#124; Array &#124; Matrix | Returns true when the x is larger than y, else returns false


## Examples

```js
math.larger(2, 3)             // returns false
math.larger(5, 2 + 2)         // returns true

const a = math.unit('5 cm')
const b = math.unit('2 inch')
math.larger(a, b)             // returns false
```


## See also

[equal](equal.md),
[unequal](unequal.md),
[smaller](smaller.md),
[smallerEq](smallerEq.md),
[largerEq](largerEq.md),
[compare](compare.md)
