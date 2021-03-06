const test = require('ava');
const { translateUnitless } = require('../lib');

const template = (t, x, y, expected) => {
  t.is(expected, translateUnitless(x, y));
};

test('No arguments', template, undefined, undefined, 'translate()');
test('One argument', template, 1, undefined, 'translate(1)');
test('Two arguments', template, 1, 1, 'translate(1, 1)');
test('Negative values', template, -1, -1, 'translate(-1, -1)');
test('Zero-values', template, 0, 0, 'translate(0, 0)');
test('String values', template, '1%', '1%', 'translate(1%, 1%)');
