<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function compile

Parse and compile an expression.
Returns a an object with a function `evaluate([scope])` to evaluate the
compiled expression.


## Syntax

```js
math.compile(expr)                       // returns one node
math.compile([expr1, expr2, expr3, ...]) // returns an array with nodes
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`expr` | string &#124; string[] &#124; Array &#124; Matrix |  The expression to be compiled

### Returns

Type | Description
---- | -----------
{evaluate: Function} &#124; Array.&lt;{evaluate: Function}&gt; | code An object with the compiled expression


## Examples

```js
const code1 = math.compile('sqrt(3^2 + 4^2)')
code1.evaluate() // 5

let scope = {a: 3, b: 4}
const code2 = math.compile('a * b') // 12
code2.evaluate(scope) // 12
scope.a = 5
code2.evaluate(scope) // 20

const nodes = math.compile(['a = 3', 'b = 4', 'a * b'])
nodes[2].evaluate() // 12
```


## See also

[parse](parse.md),
[evaluate](evaluate.md)
