/**
 * TESTS RUNNER: LOOKUP BABEL CONFIGURATION
 * ========================================
 */
/* eslint-env mocha */
import path from 'path';
import { expect, assert } from 'chai';
import lookupBabelConfiguration from '../src/lookup-babel-configuration';

describe('Eslint plugin import Babel module namespace', () => {
    describe('can lookup the babel configuration', () => {
        it('should find the .babelrc file and exists', () => {
            let result = lookupBabelConfiguration(
                path.resolve(__dirname, 'fixtures/foo/bar/baz')
            );

            expect(result).to.be.an('object');

            // @see tests/.babelrc
            assert.deepEqual(result, {
                namespaces: {
                    'test-files': 'tests/fixtures',
                    underscore: 'npm:lodash'
                }
            });

            result = lookupBabelConfiguration(
                path.resolve(__dirname, 'fixtures/config/no-options')
            );
            expect(result).to.be.an('object');
            assert.deepEqual(result, {});
        });

        it('should return null when unable to find the .babelrc file or invalid content', () => {
            let result = lookupBabelConfiguration('/');
            expect(result).to.equal(null);

            result = lookupBabelConfiguration(undefined);
            expect(result).to.equal(null);

            result = lookupBabelConfiguration(null);
            expect(result).to.equal(null);

            result = lookupBabelConfiguration(
                path.resolve(__dirname, 'fixtures/config/empty')
            );
            expect(result).to.equal(null);

            result = lookupBabelConfiguration(
                path.resolve(__dirname, 'fixtures/config/no-namespace')
            );
            expect(result).to.equal(null);
        });
    });
});
