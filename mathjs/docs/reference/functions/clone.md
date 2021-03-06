<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function clone

Clone an object. Will make a deep copy of the data.


## Syntax

```js
math.clone(x)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | * | Object to be cloned

### Returns

Type | Description
---- | -----------
* | A clone of object x


## Examples

```js
math.clone(3.5)                   // returns number 3.5
math.clone(math.complex('2-4i') // returns Complex 2 - 4i
math.clone(math.unit(45, 'deg'))  // returns Unit 45 deg
math.clone([[1, 2], [3, 4]])      // returns Array [[1, 2], [3, 4]]
math.clone("hello world")         // returns string "hello world"
```


