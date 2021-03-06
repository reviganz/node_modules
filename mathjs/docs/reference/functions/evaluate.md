<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function evaluate

Evaluate an expression.

Note the evaluating arbitrary expressions may involve security risks,
see [https://mathjs.org/docs/expressions/security.html](https://mathjs.org/docs/expressions/security.html) for more information.


## Syntax

```js
math.evaluate(expr)
math.evaluate(expr, scope)
math.evaluate([expr1, expr2, expr3, ...])
math.evaluate([expr1, expr2, expr3, ...], scope)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`expr` | string &#124; string[] &#124; Matrix | The expression to be evaluated
`scope` | Object | Scope to read/write variables

### Returns

Type | Description
---- | -----------
* | The result of the expression


## Examples

```js
math.evaluate('(2+3)/4')                // 1.25
math.evaluate('sqrt(3^2 + 4^2)')        // 5
math.evaluate('sqrt(-4)')               // 2i
math.evaluate(['a=3', 'b=4', 'a*b'])    // [3, 4, 12]

let scope = {a:3, b:4}
math.evaluate('a * b', scope)           // 12
```


## See also

[parse](parse.md),
[compile](compile.md)
