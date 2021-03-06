<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function setMultiplicity

Count the multiplicity of an element in a multiset.
A multi-dimension array will be converted to a single-dimension array before the operation.


## Syntax

```js
math.setMultiplicity(element, set)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`e` | number &#124; BigNumber &#124; Fraction &#124; Complex | An element in the multiset
`a` | Array &#124; Matrix | A multiset

### Returns

Type | Description
---- | -----------
number | The number of how many times the multiset contains the element


## Examples

```js
math.setMultiplicity(1, [1, 2, 2, 4])    // returns 1
math.setMultiplicity(2, [1, 2, 2, 4])    // returns 2
```


## See also

[setDistinct](setDistinct.md),
[setSize](setSize.md)
