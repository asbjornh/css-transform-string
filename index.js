const maybeAddUnit = (value, unit) =>
  value + (typeof value !== 'number' || value === 0 ? '' : unit);

const maybePixels = value => maybeAddUnit(value, 'px');
const maybeDegrees = value => maybeAddUnit(value, 'deg');

// If passed an array, returns that array.
// If passed a non-array, returns an array containing that value.
const ensureArray = value => (value.length ? value : [value]);

const stringifyList = (list, unit) =>
  list.map(value => maybeAddUnit(value, unit)).join(', ');

const maybePixelsList = coords => stringifyList(ensureArray(coords), 'px');
const maybeDegreesList = coords => stringifyList(ensureArray(coords), 'deg');
const unitlessList = coords => stringifyList(ensureArray(coords), '');

const stringifiers = {
  x: v => `translateX(${maybePixels(v)})`,
  y: v => `translateY(${maybePixels(v)})`,
  z: v => `translateZ(${maybePixels(v)})`,
  translate: v => `translate(${maybePixelsList(v)})`,
  translate3d: v => `translate3d(${maybePixelsList(v)})`,
  scale: v => `scale(${unitlessList(v)})`,
  scaleX: v => `scaleX(${v})`,
  scaleY: v => `scaleY(${v})`,
  scaleZ: v => `scaleZ(${v})`,
  scale3d: v => `scale3d(${unitlessList(v)})`,
  rotate: v => `rotate(${maybeDegrees(v)})`,
  rotateX: v => `rotateX(${maybeDegrees(v)})`,
  rotateY: v => `rotateY(${maybeDegrees(v)})`,
  rotateZ: v => `rotateZ(${maybeDegrees(v)})`,
  skew: v => `skew(${maybeDegreesList(v)})`,
  skewX: v => `skewX(${maybeDegrees(v)})`,
  skewY: v => `skewY(${maybeDegrees(v)})`,
  perspective: v => `perspective(${maybePixels(v)})`
};

function transform(transformProperties = {}) {
  return Object.entries(transformProperties)
    .map(([name, value]) => {
      const stringifier = stringifiers[name];

      if (!stringifier) {
        throw new Error(`Property '${name}' is not supported`);
      }

      return stringifier(value);
    })
    .join(' ');
}

export default transform;
