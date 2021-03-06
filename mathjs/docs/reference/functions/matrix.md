<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function matrix

Create a Matrix. The function creates a new `math.Matrix` object from
an `Array`. A Matrix has utility functions to manipulate the data in the
matrix, like getting the size and getting or setting values in the matrix.
Supported storage formats are 'dense' and 'sparse'.


## Syntax

```js
math.matrix()                         // creates an empty matrix using default storage format (dense).
math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
math.matrix('dense')                  // creates an empty matrix using the given storage format.
math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`data` | Array &#124; Matrix | A multi dimensional array
`format` | string | The Matrix storage format

### Returns

Type | Description
---- | -----------
Matrix | The created matrix


## Examples

```js
let m = math.matrix([[1, 2], [3, 4]])
m.size()                        // Array [2, 2]
m.resize([3, 2], 5)
m.valueOf()                     // Array [[1, 2], [3, 4], [5, 5]]
m.get([1, 0])                    // number 3
```


## See also

[bignumber](bignumber.md),
[boolean](boolean.md),
[complex](complex.md),
[index](index.md),
[number](number.md),
[string](string.md),
[unit](unit.md),
[sparse](sparse.md)
