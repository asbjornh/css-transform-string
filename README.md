# css-transform-string

[![npm version](https://img.shields.io/npm/v/css-transform-string.svg?style=flat)](https://www.npmjs.com/package/css-transform-string)
[![build status](https://travis-ci.org/asbjornh/css-transform-string.svg?branch=master)](https://travis-ci.org/asbjornh/css-transform-string)

## API

The module exports the following named exports. The default export is the `transform` function.

* `transform(_transformObject_)`
* `transformUnitless(_transformObject_)`
* `translate(x, y)`
* `translateUnitless(x, y)`

### translate(_x, y_), translateUnitless(_x, y_)

* `x`: number | string
* `y`: number | string

One might wonder why this is the only transform property that has its own utility. The reason is that I at some point found that 90% of the time I was just using the utility do to translates. Constantly doing `transform({ translate: [1, 2] })` got boring, so I decided to add `translate`.

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

## Examples

### transform

```js
import transform from "css-transform-string";

transform({ x: 50, y: "50%", rotateX: 10, rotateY: "1rad" });
// "translateX(50px) translateY(50%) rotateX(10deg) rotateY(1rad)"
```

### transformUnitless

```js
import { transformUnitless } from "css-transform-string";

transformUnitless({ x: 50, y: "50%", rotateX: 10, rotateY: "1rad" });
// "translateX(50) translateY(50%) rotateX(10) rotateY(1rad)"
```

### translate

```js
import { translate } from "css-transform-string";

translate(50, "50%");
// "translate(50px, 50%)"
```

### translateUnitless

```js
import { translateUnitless } from "css-transform-string";

translateUnitless(50, "50%");
// "translate(50, 50%)"
```
