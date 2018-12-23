export type Value = number | string | (string | number)[];
export type SingleValue = number | string;
export type Stringifier = (v: Value) => string;

type TransformProperty =
  | 'x'
  | 'y'
  | 'z'
  | 'translate'
  | 'translate3d'
  | 'scale'
  | 'scale3d'
  | 'scaleX'
  | 'scaleY'
  | 'scaleZ'
  | 'rotate'
  | 'rotateX'
  | 'rotateY'
  | 'rotateZ'
  | 'skew'
  | 'skewX'
  | 'skewY'
  | 'perspective';

// Inlined types for more understandable intellisense
export type TransformProperties = {
  [T in TransformProperty]?: string | number | (string | number)[]
};
export type Stringifiers = { [T in TransformProperty]: Stringifier };
