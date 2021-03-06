<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function dotPow

Calculates the power of x to y element wise.


## Syntax

```js
math.dotPow(x, y)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; BigNumber &#124; Complex &#124; Unit &#124; Array &#124; Matrix | The base
`y` | number &#124; BigNumber &#124; Complex &#124; Unit &#124; Array &#124; Matrix | The exponent

### Returns

Type | Description
---- | -----------
number &#124; BigNumber &#124; Complex &#124; Unit &#124; Array &#124; Matrix | The value of `x` to the power `y`


## Examples

```js
math.dotPow(2, 3)            // returns number 8

const a = [[1, 2], [4, 3]]
math.dotPow(a, 2)            // returns Array [[1, 4], [16, 9]]
math.pow(a, 2)               // returns Array [[9, 8], [16, 17]]
```


## See also

[pow](pow.md),
[sqrt](sqrt.md),
[multiply](multiply.md)
