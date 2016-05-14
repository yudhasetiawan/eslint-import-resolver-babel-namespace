/**
 * TESTS RUNNER: BABEL REGISTER
 * ============================
 */
require('babel-register')(JSON.parse(require('fs').readFileSync('.babelrc', 'utf8')));
