const test = require('ava');
const { transformUnitless } = require('../lib');

const template = (t, input, expected) => {
  t.is(expected, transformUnitless(input));
};

test('Empty argument', template, undefined, '');

test(
  'Supports all properties',
  template,
  {
    x: 1,
    y: 1,
    z: 1,
    translate: [1, 1],
    translate3d: [1, 1, 1],
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    scale3d: [1, 1, 1],
    rotate: 1,
    rotateX: 1,
    rotateY: 1,
    rotateZ: 1,
    skew: 1,
    skewX: 1,
    skewY: 1,
    perspective: 1
  },
  'translateX(1) translateY(1) translateZ(1) translate(1, 1) translate3d(1, 1, 1) scale(1) scaleX(1) scaleY(1) scaleZ(1) scale3d(1, 1, 1) rotate(1) rotateX(1) rotateY(1) rotateZ(1) skew(1) skewX(1) skewY(1) perspective(1)'
);

test(
  'Supports alternative inputs',
  template,
  {
    translate: 1,
    scale: [1, 1],
    skew: [1, 1]
  },
  'translate(1) scale(1, 1) skew(1, 1)'
);

test(
  'Supports negative values',
  template,
  {
    x: -1,
    translate3d: [-1, -1, -1],
    rotate: -1,
    skew: [-1, -1]
  },
  'translateX(-1) translate3d(-1, -1, -1) rotate(-1) skew(-1, -1)'
);

test(
  'Supports zero-values',
  template,
  { x: 0, translate3d: [0, 0, 0], scale: 0, rotate: 0, skew: 0 },
  'translateX(0) translate3d(0, 0, 0) scale(0) rotate(0) skew(0)'
);

test(
  'Supports string values',
  template,
  {
    x: '50%',
    translate: ['50%', '50%'],
    rotate: '1rad',
    skew: ['1rad', '1rad'],
    perspective: '1em'
  },
  'translateX(50%) translate(50%, 50%) rotate(1rad) skew(1rad, 1rad) perspective(1em)'
);

test('Throws on unsupported property', t => {
  const error = t.throws(() => {
    transformUnitless({ notSupported: 1 });
  });
  t.is("Property 'notSupported' is not supported", error.message);
});
