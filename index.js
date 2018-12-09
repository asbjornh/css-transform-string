const maybeAddUnit = (value, unit) =>
  value + (typeof value !== 'number' || value === 0 ? '' : unit);

const maybePixels = value => maybeAddUnit(value, 'px');
const maybeDegrees = value => maybeAddUnit(value, 'deg');

const ensureArray = value => (value.length ? value : [value]);

const stringifyList = (list, unit) =>
  list.map(value => maybeAddUnit(value, unit)).join(', ');

const getMultiTranslate = coords => stringifyList(ensureArray(coords), 'px');
const getMultiDegrees = coords => stringifyList(ensureArray(coords), 'deg');
const getMultiUnitless = coords => stringifyList(ensureArray(coords), '');

const stringifiers = {
  x: v => `translateX(${maybePixels(v)})`,
  y: v => `translateY(${maybePixels(v)})`,
  z: v => `translateZ(${maybePixels(v)})`,
  translate: v => `translate(${getMultiTranslate(v)})`,
  translate3d: v => `translate3d(${getMultiTranslate(v)})`,
  scale: v => `scale(${getMultiUnitless(v)})`,
  scaleX: v => `scaleX(${v})`,
  scaleY: v => `scaleY(${v})`,
  scaleZ: v => `scaleZ(${v})`,
  scale3d: v => `scale3d(${getMultiUnitless(v)})`,
  rotate: v => `rotate(${maybeDegrees(v)})`,
  rotateX: v => `rotateX(${maybeDegrees(v)})`,
  rotateY: v => `rotateY(${maybeDegrees(v)})`,
  rotateZ: v => `rotateZ(${maybeDegrees(v)})`,
  skew: v => `skew(${getMultiDegrees(v)})`,
  perspective: v => `perspective(${maybePixels(v)})`
};

function transform(transformProperties) {
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
