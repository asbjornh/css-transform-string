# css-transform-string

[![npm version](https://img.shields.io/npm/v/css-transform-string.svg?style=flat)](https://www.npmjs.com/package/css-transform-string)

### transform(_transformObject_)

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
  * `perspective`: number | string
* returns: string

Returns css string of the input object (all properties optional).

```js
import transform from "css-transform-string";

transform({ x: 50, y: "50%", rotateX: 10, rotateY: "1rad" });
// "translateX(50px) translateY(50%) rotateX(10deg) rotateY(1rad)"
```
