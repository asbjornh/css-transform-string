# css-transform-string

[![npm version](https://img.shields.io/npm/v/css-transform-string.svg?style=flat)](https://www.npmjs.com/package/css-transform-string)
[![build status](https://travis-ci.org/asbjornh/css-transform-string.svg?branch=master)](https://travis-ci.org/asbjornh/css-transform-string)

## API

The module exports an object containing two functions:

* `transform(_transformObject_)`
* `transformUnitless(_transformObject_)`

### transform(_transformObject_), transformUnitless(_transformObject_)

Both function accept the same transform object. `transformUnitless` will not add any units to the output string.

* `transformObject`: object
  * `x`: number | string,
  * `y`: number | string,
  * `z`: number | string
  * `translate`: number | string | array (number | string)
  * `translate3d`: number | string | array (number | string)
  * `scale`: number | array (number)
  * `scaleX`: number
  * `scaleY`: number
  * `scaleZ`: number
  * `scale3d`: number | array (number)
  * `rotate`: number | string
  * `rotateX`: number | string
  * `rotateY`: number | string
  * `rotateZ`: number | string
  * `skew`: number | string | array (number | string)
  * `skewX`: number | string
  * `skewY`: number | string
  * `perspective`: number | string
* returns: string

Returns css string of the input object (all properties optional).

```js
import { transform } from "css-transform-string";

transform({ x: 50, y: "50%", rotateX: 10, rotateY: "1rad" });
// "translateX(50px) translateY(50%) rotateX(10deg) rotateY(1rad)"
```

```js
import { transformUnitless } from "css-transform-string";

transformUnitless({ x: 50, y: "50%", rotateX: 10, rotateY: "1rad" });
// "translateX(50) translateY(50%) rotateX(10) rotateY(1rad)"
```
