<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function re

Get the real part of a complex number.
For a complex number `a + bi`, the function returns `a`.

For matrices, the function is evaluated element wise.


## Syntax

```js
math.re(x)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; BigNumber &#124; Complex &#124; Array &#124; Matrix |  A complex number or array with complex numbers

### Returns

Type | Description
---- | -----------
number &#124; BigNumber &#124; Array &#124; Matrix | The real part of x


## Examples

```js
const a = math.complex(2, 3)
math.re(a)                     // returns number 2
math.im(a)                     // returns number 3

math.re(math.complex('-5.2i')) // returns number 0
math.re(math.complex(2.4))     // returns number 2.4
```


## See also

[im](im.md),
[conj](conj.md),
[abs](abs.md),
[arg](arg.md)
