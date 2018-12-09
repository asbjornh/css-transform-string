const trimTrailingWhitespace = (string = '') => string.replace(/\s+$/, '');

function parseCoord(translate) {
  return typeof translate === 'string'
    ? translate
    : translate + (translate === 0 ? '' : 'px');
}

function parseDegree(degree) {
  return typeof degree === 'string'
    ? degree
    : degree + (degree === 0 ? '' : 'deg');
}

function getMultiDimensionalString(coords, parser) {
  return coords.reduce((accum, coord, i) => {
    accum += parser(coord);
    accum += i < coords.length - 1 ? ', ' : '';
    return accum;
  }, '');
}

function getMultiTranslate(coords) {
  return coords.length > 1
    ? getMultiDimensionalString(coords, parseCoord)
    : parseCoord(coords);
}

function getMultiDegrees(degrees) {
  return degrees.length > 1
    ? getMultiDimensionalString(degrees, parseDegree)
    : parseDegree(degrees);
}

function getMultiValues(values) {
  return values.length > 1 ? getMultiDimensionalString(values, v => v) : values;
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

  string += exists(x) ? `translateX(${parseCoord(x)}) ` : '';
  string += exists(y) ? `translateY(${parseCoord(y)}) ` : '';
  string += exists(z) ? `translateZ(${parseCoord(z)}) ` : '';
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
  string += exists(rotate) ? `rotate(${parseDegree(rotate)}) ` : '';
  string += exists(rotateX) ? `rotateX(${parseDegree(rotateX)}) ` : '';
  string += exists(rotateY) ? `rotateY(${parseDegree(rotateY)}) ` : '';
  string += exists(rotateZ) ? `rotateZ(${parseDegree(rotateZ)}) ` : '';
  string += exists(skew) ? `skew(${getMultiDegrees(skew)}) ` : '';
  string += exists(perspective)
    ? `perspective(${parseCoord(perspective)}) `
    : '';

  return trimTrailingWhitespace(string);
}

export default transform;
