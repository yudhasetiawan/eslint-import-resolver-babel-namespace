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

        it('should return true when using the exact name as a npm module', () => {
            const moduleResolve = pluginResolver.resolve(
                'underscore',
                path.resolve('index.js')
            );

            expect(moduleResolve).to.be.an('object');

            assert.deepEqual(moduleResolve, {
                found: true,
                path: path.resolve('../node_modules/lodash/lodash.js')
            });
        });

        it('should return true when using the package name', () => {
            const moduleResolve = pluginResolver.resolve(
                'eslint-import-resolver-babel-namespace',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');

            assert.deepEqual(moduleResolve, {
                found: true,
                path: path.resolve('../src/index.js')
            });
        });

        it('should return true when using default package name sign expansion (:)', () => {
            const moduleResolve = pluginResolver.resolve(
                ':',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');

            assert.deepEqual(moduleResolve, {
                found: true,
                path: path.resolve('../src/index.js')
            });
        });

        it('should return true when using default package name sign expansion (~)', () => {
            const moduleResolve = pluginResolver.resolve(
                '~',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');

            assert.deepEqual(moduleResolve, {
                found: true,
                path: path.resolve('../src/index.js')
            });
        });

        describe('when requiring using the sub file of the package', () => {
            it('should return true when mapped is a file using the alias name', () => {
                const moduleResolve = pluginResolver.resolve(
                    'test-files/foo-bar-baz',
                    path.resolve('./fixtures/foo/bar/baz')
                );

                expect(moduleResolve).to.be.an('object');

                assert.deepEqual(moduleResolve, {
                    found: true,
                    path: path.resolve('./fixtures/foo-bar-baz.js')
                });
            });

            it('should return true when using default package name', () => {
                const moduleResolve = pluginResolver.resolve(
                    'eslint-import-resolver-babel-namespace/index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolve).to.be.an('object');

                assert.deepEqual(moduleResolve, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });
            });

            it('should return true when using default package name sign expansion (: | ~)', () => {
                const moduleResolveColon = pluginResolver.resolve(
                    ':/index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolveColon).to.be.an('object');
                assert.deepEqual(moduleResolveColon, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });

                const moduleResolveTilde = pluginResolver.resolve(
                    '~/index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolveTilde).to.be.an('object');
                assert.deepEqual(moduleResolveTilde, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });
            });

            it('should return true when using sign expansion (: | ~) without separator', () => {
                const moduleResolveColon = pluginResolver.resolve(
                    ':index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolveColon).to.be.an('object');
                assert.deepEqual(moduleResolveColon, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });

                const moduleResolveTilde = pluginResolver.resolve(
                    '~index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolveTilde).to.be.an('object');
                assert.deepEqual(moduleResolveTilde, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });
            });
        });

        describe('can handle invalid statement', () => {
            it('should return false when source file is invalid', () => {
                const moduleResolve = pluginResolver.resolve(
                    './fixtures/foo/bar/baz',
                    path.resolve('../invalid/path')
                );

                expect(moduleResolve).to.be.an('object');
                assert.deepEqual(moduleResolve, {
                    found: false,
                });
            });
        });

        it('should return false when no mapping is required', () => {
            const moduleResolve = pluginResolver.resolve(
                './fixtures/foo/bar/baz',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');
            assert.deepEqual(moduleResolve, {
                found: false,
            });
        });

        it('should return false when a module is an unknown', () => {
            const moduleResolve = pluginResolver.resolve(
                'unknown-plugin',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');
            expect(moduleResolve.found).to.equal(false);
            expect(moduleResolve.path).to.be.undefined; // eslint-disable-line no-unused-expressions
        });

        it('should return false when the mapped file is not found', () => {
            const moduleResolve = pluginResolver.resolve(
                'test-files/unknown-file',
                path.resolve('./fixtures/foo/bar/baz')
            );

            expect(moduleResolve).to.be.an('object');
            expect(moduleResolve.found).to.equal(false);
            expect(moduleResolve.path).to.be.undefined; // eslint-disable-line no-unused-expressions
        });
    });
});
