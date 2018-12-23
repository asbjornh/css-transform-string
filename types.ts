export type Value = number | string;
export type MultiValue = Value[] | Value;
type Stringifier = (v: Value) => string;
type MultiStringifier = (v: MultiValue) => string;

type TransformObject<T, U> = {
  x?: T;
  y?: T;
  z?: T;
  translate?: U;
  translate3d?: U;
  scale?: U;
  scale3d?: U;
  scaleX?: T;
  scaleY?: T;
  scaleZ?: T;
  rotate?: T;
  rotateX?: T;
  rotateY?: T;
  rotateZ?: T;
  skew?: U;
  skewX?: T;
  skewY?: T;
  perspective?: T;
};

// Inlined types for more understandable intellisense
export type TransformProperties = TransformObject<
  string | number,
  string | number | (string | number)[]
>;
export type Stringifiers = TransformObject<Stringifier, MultiStringifier>;
