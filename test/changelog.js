const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const test = require('ava');

test('Has entry for current version', t => {
  const changelog = fs.readFileSync(
    path.resolve(__dirname, '..', 'CHANGELOG.md'),
    'utf8'
  );
  t.is(true, changelog.includes(`# ${packageJson.version}`));
});
