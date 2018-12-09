const trimTrailingWhitespace = (string = '') => string.replace(/\s+$/, '');

const maybeAddUnit = (value, unit) =>
  value + (typeof value !== 'number' || value === 0 ? '' : unit);

const maybePixels = value => maybeAddUnit(value, 'px');
const maybeDegrees = value => maybeAddUnit(value, 'deg');

const stringifyList = (list, unit) =>
  list.map(value => maybeAddUnit(value, unit)).join(', ');

function getMultiTranslate(coords) {
  return coords.length > 1
    ? stringifyList(coords, 'px')
    : maybeAddUnit(coords, 'px');
}

function getMultiDegrees(degrees) {
  return degrees.length > 1
    ? stringifyList(degrees, 'deg')
    : maybeAddUnit(degrees, 'deg');
}

function getMultiValues(values) {
  return values.length > 1 ? stringifyList(values, '') : values;
}

function exists(val) {
  return typeof val !== 'undefined';
}

function transform({
  x,
  y,
  z,
  translate,
  translate3d,
  scale,
  scaleX,
  scaleY,
  scaleZ,
  scale3d,
  rotate,
  rotateX,
  rotateY,
  rotateZ,
  skew,
  perspective
}) {
  let string = '';

  string += exists(x) ? `translateX(${maybePixels(x)}) ` : '';
  string += exists(y) ? `translateY(${maybePixels(y)}) ` : '';
  string += exists(z) ? `translateZ(${maybePixels(z)}) ` : '';
  string += exists(translate)
    ? `translate(${getMultiTranslate(translate)}) `
    : '';
  string += exists(translate3d)
    ? `translate3d(${getMultiTranslate(translate3d)}) `
    : '';
  string += exists(scale) ? `scale(${getMultiValues(scale)}) ` : '';
  string += exists(scaleX) ? `scaleX(${scaleX}) ` : '';
  string += exists(scaleY) ? `scaleY(${scaleY}) ` : '';
  string += exists(scaleZ) ? `scaleZ(${scaleZ}) ` : '';
  string += exists(scale3d) ? `scale3d(${getMultiValues(scale3d)}) ` : '';
  string += exists(rotate) ? `rotate(${maybeDegrees(rotate)}) ` : '';
  string += exists(rotateX) ? `rotateX(${maybeDegrees(rotateX)}) ` : '';
  string += exists(rotateY) ? `rotateY(${maybeDegrees(rotateY)}) ` : '';
  string += exists(rotateZ) ? `rotateZ(${maybeDegrees(rotateZ)}) ` : '';
  string += exists(skew) ? `skew(${getMultiDegrees(skew)}) ` : '';
  string += exists(perspective)
    ? `perspective(${maybePixels(perspective)}) `
    : '';

  return trimTrailingWhitespace(string);
}

export default transform;
