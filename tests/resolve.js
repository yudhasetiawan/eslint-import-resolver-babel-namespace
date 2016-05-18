/**
 * TESTS RUNNER: RESOLVER
 * ======================
 */
/* eslint-env mocha */
import path from 'path';
import { expect, assert } from 'chai';
import resolve from '../src/resolve';

// @see tests/.babelrc
describe('Eslint plugin import Babel module namespace', () => {
    describe('can resolve the module namespace', () => {
        const cwd = process.cwd();

        before(() => {
            process.chdir(__dirname);
        });

        after(() => {
            process.chdir(cwd);
        });

        it('should return true when using the exact name as a npm module', () => {
            const moduleResolve = resolve(
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
            const moduleResolve = resolve(
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
            const moduleResolve = resolve(
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
            const moduleResolve = resolve(
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
                const moduleResolve = resolve(
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
                const moduleResolve = resolve(
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
                const moduleResolveColon = resolve(
                    ':/index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolveColon).to.be.an('object');
                assert.deepEqual(moduleResolveColon, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });

                const moduleResolveTilde = resolve(
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
                const moduleResolveColon = resolve(
                    ':index',
                    path.resolve('./fixtures/foo-bar-baz')
                );

                expect(moduleResolveColon).to.be.an('object');
                assert.deepEqual(moduleResolveColon, {
                    found: true,
                    path: path.resolve('../src/index.js')
                });

                const moduleResolveTilde = resolve(
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
                const moduleResolve = resolve(
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
            const moduleResolve = resolve(
                './fixtures/foo/bar/baz',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');
            assert.deepEqual(moduleResolve, {
                found: false,
            });
        });

        it('should return false when a module is an unknown', () => {
            const moduleResolve = resolve(
                'unknown-plugin',
                path.resolve('./fixtures/foo-bar-baz')
            );

            expect(moduleResolve).to.be.an('object');
            expect(moduleResolve.found).to.equal(false);
            expect(moduleResolve.path).to.be.undefined; // eslint-disable-line no-unused-expressions
        });

        it('should return false when the mapped file is not found', () => {
            const moduleResolve = resolve(
                'test-files/unknown-file',
                path.resolve('./fixtures/foo/bar/baz')
            );

            expect(moduleResolve).to.be.an('object');
            expect(moduleResolve.found).to.equal(false);
            expect(moduleResolve.path).to.be.undefined; // eslint-disable-line no-unused-expressions
        });
    });
});
