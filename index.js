const maybeAddUnit = (value, unit) =>
  value + (typeof value !== 'number' || value === 0 ? '' : unit);

const pixels = value => maybeAddUnit(value, 'px');
const degrees = value => maybeAddUnit(value, 'deg');

// If passed an array, returns that array.
// If passed a non-array, returns an array containing that value.
const ensureArray = value => (value.length ? value : [value]);

const stringifyList = (list, unit) =>
  ensureArray(list)
    .map(value => maybeAddUnit(value, unit))
    .join(', ');

const pixelsList = values => stringifyList(values, 'px');
const degreesList = values => stringifyList(values, 'deg');
const unitlessList = values => stringifyList(values, '');

const stringifiers = addUnits => {
  const maybeDegrees = addUnits ? degrees : v => v;
  const maybeDegreesList = addUnits ? degreesList : unitlessList;
  const maybePixels = addUnits ? pixels : v => v;
  const maybePixelsList = addUnits ? pixelsList : unitlessList;

  return {
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
};

function transform(transformProperties = {}, addUnits) {
  return Object.entries(transformProperties)
    .map(([name, value]) => {
      const stringifier = stringifiers(addUnits)[name];

      if (!stringifier) {
        throw new Error(`Property '${name}' is not supported`);
      }

      return stringifier(value);
    })
    .join(' ');
}

export default {
  transform: transformProperties => transform(transformProperties, true),
  transformUnitless: transformProperties => transform(transformProperties)
};
