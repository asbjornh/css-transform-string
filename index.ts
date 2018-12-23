import { Value, TransformProperties, Stringifiers, MultiValue } from './types';

const isNonZeroNumber = (n: any) => typeof n === 'number' && n !== 0;

const maybeAddUnit = (value: Value, unit: string, addUnit: boolean) =>
  value + (addUnit && isNonZeroNumber(value) ? unit : '');

// If passed an array, returns that array.
// If passed a non-array, returns an array containing that value.
const ensureArray = (v: any): any[] => (v.length ? v : [v]);

const stringifyList = (maybeList: MultiValue, unit: string, addUnits: boolean) =>
  ensureArray(maybeList)
    .map((value: Value) => maybeAddUnit(value, unit, addUnits))
    .join(', ');

const unitlessList = (values: MultiValue) => stringifyList(values, '', false);

const getStringifiers = (addUnits: boolean): Stringifiers => {
  const degrees = (v: Value) => maybeAddUnit(v, 'deg', addUnits);
  const degreesList = (v: MultiValue) => stringifyList(v, 'deg', addUnits);

  const pixels = (v: Value) => maybeAddUnit(v, 'px', addUnits);
  const pixelsList = (v: MultiValue) => stringifyList(v, 'px', addUnits);

  return {
    x: (v: Value) => `translateX(${pixels(v)})`,
    y: (v: Value) => `translateY(${pixels(v)})`,
    z: (v: Value) => `translateZ(${pixels(v)})`,
    translate: (v: MultiValue) => `translate(${pixelsList(v)})`,
    translate3d: (v: MultiValue) => `translate3d(${pixelsList(v)})`,
    scale: (v: MultiValue) => `scale(${unitlessList(v)})`,
    scaleX: (v: Value) => `scaleX(${v})`,
    scaleY: (v: Value) => `scaleY(${v})`,
    scaleZ: (v: Value) => `scaleZ(${v})`,
    scale3d: (v: MultiValue) => `scale3d(${unitlessList(v)})`,
    rotate: (v: Value) => `rotate(${degrees(v)})`,
    rotateX: (v: Value) => `rotateX(${degrees(v)})`,
    rotateY: (v: Value) => `rotateY(${degrees(v)})`,
    rotateZ: (v: Value) => `rotateZ(${degrees(v)})`,
    skew: (v: MultiValue) => `skew(${degreesList(v)})`,
    skewX: (v: Value) => `skewX(${degrees(v)})`,
    skewY: (v: Value) => `skewY(${degrees(v)})`,
    perspective: (v: Value) => `perspective(${pixels(v)})`
  };
};

const stringifiers = getStringifiers(true);
const unitlessStringifiers = getStringifiers(false);

function doTransform(stringifiers: Stringifiers, transformProperties: TransformProperties) {
  return Object.entries(transformProperties || {})
    .map(([name, value]) => {
      const stringifier = stringifiers[name];

      if (!stringifier) throw new Error(`Property '${name}' is not supported`);

      return stringifier(value);
    })
    .join(' ');
}

function doTranslate(stringifiers: Stringifiers, x: Value, y: Value) {
  const values = [x, y].filter(v => typeof v !== 'undefined');
  return values.length ? stringifiers.translate(values) : '';
}

export const transform = (t: TransformProperties) => doTransform(stringifiers, t);
export const transformUnitless = (t: TransformProperties) => doTransform(unitlessStringifiers, t);
export const translate = (x: Value, y: Value) => doTranslate(stringifiers, x, y);
export const translateUnitless = (x: Value, y: Value) => doTranslate(unitlessStringifiers, x, y);

export default transform;

transform({ x: 1, translate: 1, translate3d: [1, 2] });
translate(1, 2);
