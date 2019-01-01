import {
  Value,
  TransformProperties,
  Stringifiers,
  SingleValue,
  Stringifier
} from './types';

const isNonZeroNumber = (n: any) => typeof n === 'number' && n !== 0;
const ensureArray = (v: any): any[] => (Array.isArray(v) ? v : [v]);
const safeString = (v: string | number): string => (v === undefined ? '' : String(v));

const maybeAddUnit = (value: SingleValue, unit: string) =>
  safeString(value) + (isNonZeroNumber(value) ? unit : '');

const stringifyValue = (value: Value, unit: string, addUnits: boolean) =>
  ensureArray(value)
    .map((value: SingleValue) => (addUnits ? maybeAddUnit(value, unit) : value))
    .filter(v => v !== '')
    .join(', ');

const getStringifiers = (addUnits: boolean) => {
  const degrees: Stringifier = v => stringifyValue(v, 'deg', addUnits);
  const pixels: Stringifier = v => stringifyValue(v, 'px', addUnits);
  const unitless: Stringifier = v => stringifyValue(v, '', false);

  const stringifiers: Stringifiers = {
    x: v => `translateX(${pixels(v)})`,
    y: v => `translateY(${pixels(v)})`,
    z: v => `translateZ(${pixels(v)})`,
    translate: v => `translate(${pixels(v)})`,
    translate3d: v => `translate3d(${pixels(v)})`,
    scale: v => `scale(${unitless(v)})`,
    scaleX: v => `scaleX(${unitless(v)})`,
    scaleY: v => `scaleY(${unitless(v)})`,
    scaleZ: v => `scaleZ(${unitless(v)})`,
    scale3d: v => `scale3d(${unitless(v)})`,
    rotate: v => `rotate(${degrees(v)})`,
    rotateX: v => `rotateX(${degrees(v)})`,
    rotateY: v => `rotateY(${degrees(v)})`,
    rotateZ: v => `rotateZ(${degrees(v)})`,
    skew: v => `skew(${degrees(v)})`,
    skewX: v => `skewX(${degrees(v)})`,
    skewY: v => `skewY(${degrees(v)})`,
    perspective: v => `perspective(${pixels(v)})`
  };

  return stringifiers;
};

const stringifiers = getStringifiers(true);
const unitlessStringifiers = getStringifiers(false);

const doTransform = (s: Stringifiers, t: TransformProperties) =>
  Object.entries(t || {})
    .map(([name, value]) => {
      const stringifier = s[name];
      if (!stringifier) throw new Error(`Property '${name}' is not supported`);
      return stringifier(value);
    })
    .join(' ');

const doTranslate = (s: Stringifiers, x: SingleValue, y?: SingleValue) =>
  s.translate(y === undefined ? x : [x, y]);

export const transform = (t: TransformProperties) => doTransform(stringifiers, t);
export const transformUnitless = (t: TransformProperties) =>
  doTransform(unitlessStringifiers, t);
export const translate = (x: string | number, y?: string | number) =>
  doTranslate(stringifiers, x, y);
export const translateUnitless = (x: string | number, y?: string | number) =>
  doTranslate(unitlessStringifiers, x, y);

export default transform;
