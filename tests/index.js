/**
 * This source file is part of my personal project.
 *
 * This source code license can be found in the LICENSE file in the root directory of this
 * source tree.
 *
 * @author    Yudha Setiawan <me@yudhasetiawan.com>
 * @link      http://yudhasetiawan.com
 * @copyright Copyright (c) 2016, Yudha Setiawan.
 */
/* eslint-env mocha */
import path from 'path';
import { expect, assert } from 'chai';
import pluginResolver from '../src';

describe('Eslint plugin import Babel module namespace', () => {
    it('should have the interfaceVersion property', () => {
        expect(pluginResolver)
            .to.have.property('interfaceVersion')
            .that.is.a('number')
            .that.equals(2);
    });

    describe('can resolve relative path', () => {
        const cwd = process.cwd();

        before(() => {
            process.chdir(__dirname);
        });

        after(() => {
            process.chdir(cwd);
        });

        it('should return false when no mapping is required', () => {
            const moduleResolve = pluginResolver.resolve(
                '../fixtures/foo/bar/baz',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');
            assert.deepEqual(moduleResolve, {
                found: true,
                path: path.resolve('./fixtures/foo/bar/baz.js'),
            });
        });
    });
});
