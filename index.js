const isNonZeroNumber = maybeNumber => typeof maybeNumber === 'number' && maybeNumber !== 0;

const maybeAddUnit = (value, unit, addUnit) =>
  value + (addUnit && isNonZeroNumber(value) ? unit : '');

// If passed an array, returns that array.
// If passed a non-array, returns an array containing that value.
const ensureArray = value => (value.length ? value : [value]);

const stringifyList = (maybeList, unit, addUnits) =>
  ensureArray(maybeList)
    .map(value => maybeAddUnit(value, unit, addUnits))
    .join(', ');

const unitlessList = values => stringifyList(values, '', false);

const stringifiers = addUnits => {
  const degrees = v => maybeAddUnit(v, 'deg', addUnits);
  const degreesList = v => stringifyList(v, 'deg', addUnits);

  const pixels = v => maybeAddUnit(v, 'px', addUnits);
  const pixelsList = v => stringifyList(v, 'px', addUnits);

  return {
    x: v => `translateX(${pixels(v)})`,
    y: v => `translateY(${pixels(v)})`,
    z: v => `translateZ(${pixels(v)})`,
    translate: v => `translate(${pixelsList(v)})`,
    translate3d: v => `translate3d(${pixelsList(v)})`,
    scale: v => `scale(${unitlessList(v)})`,
    scaleX: v => `scaleX(${v})`,
    scaleY: v => `scaleY(${v})`,
    scaleZ: v => `scaleZ(${v})`,
    scale3d: v => `scale3d(${unitlessList(v)})`,
    rotate: v => `rotate(${degrees(v)})`,
    rotateX: v => `rotateX(${degrees(v)})`,
    rotateY: v => `rotateY(${degrees(v)})`,
    rotateZ: v => `rotateZ(${degrees(v)})`,
    skew: v => `skew(${degreesList(v)})`,
    skewX: v => `skewX(${degrees(v)})`,
    skewY: v => `skewY(${degrees(v)})`,
    perspective: v => `perspective(${pixels(v)})`
  };
};

function doTransform(transformProperties = {}, addUnits) {
  return Object.entries(transformProperties)
    .map(([name, value]) => {
      const stringifier = stringifiers(addUnits)[name];

      if (!stringifier) throw new Error(`Property '${name}' is not supported`);

      return stringifier(value);
    })
    .join(' ');
}

function doTranslate(x, y, addUnits) {
  const values = [x, y].filter(v => typeof v !== 'undefined');
  return values.length ? stringifiers(addUnits).translate(values) : '';
}

const transformWithUnits = transformProperties => doTransform(transformProperties, true);

export const transform = transformWithUnits;
export const transformUnitless = transformProperties => doTransform(transformProperties, false);
export const translate = (x, y) => doTranslate(x, y, true);
export const translateUnitless = (x, y) => doTranslate(x, y, false);

export default transform;
