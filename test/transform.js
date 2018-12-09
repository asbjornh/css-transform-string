const test = require('ava');
const transform = require('../index').default;

const template = (t, input, expected) => {
  t.is(expected, transform(input));
};

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
    perspective: 1
  },
  'translateX(1px) translateY(1px) translateZ(1px) translate(1px, 1px) translate3d(1px, 1px, 1px) scale(1) scaleX(1) scaleY(1) scaleZ(1) scale3d(1, 1, 1) rotate(1deg) rotateX(1deg) rotateY(1deg) rotateZ(1deg) skew(1deg) perspective(1px)'
);

test(
  'Supports alternative inputs',
  template,
  {
    translate: 1,
    scale: [1, 1],
    skew: [1, 1]
  },
  'translate(1px) scale(1, 1) skew(1deg, 1deg)'
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
  'translateX(-1px) translate3d(-1px, -1px, -1px) rotate(-1deg) skew(-1deg, -1deg)'
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
