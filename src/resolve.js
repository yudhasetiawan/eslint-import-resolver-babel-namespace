/**
 * RESOLVER
 * ========
 */
import path from 'path';
import pathIsInside from 'path-is-inside';
import debugInstance from 'debug';
import eslintResolver from 'eslint-import-resolver-node';
import transformModuleNamespace from 'babel-plugin-namespace/lib/transform-namespace';
import generateSourceMaps from 'babel-plugin-namespace/lib/generate-source-maps';
import lookupBabelConfiguration from ':lookup-babel-configuration';

const debug = debugInstance('eslint:plugin:import-resolver-babel-namespace:resolver');

/**
 * Find the full path to 'source', given 'file' as a full reference path.
 *
 * @param {String} modulePath The module to resolve
 * @param {String} sourceFile The source file's full path
 * @param {Object} config The configuration of this plugin
 *
 * @return {Object}
 */
const resolve = (modulePath, sourceFile, config = {}) => { // eslint-disable-line no-unused-vars
    // @see lookupBabelConfiguration()
    const resolvePath = pathIsInside(sourceFile, process.cwd()) ? sourceFile : process.cwd();
    const configurations = lookupBabelConfiguration(resolvePath);

    debug('Start to resolve the module namespace: %s (%s)', modulePath, sourceFile);

    // should skip if the path is relative or absolute
    if (!configurations
        || (modulePath && (path.isAbsolute(modulePath) || /^(\.)/.test(modulePath)))
    ) {
        // Another resolver will take care about it
        return {
            found: false
        };
    }

    const sourceMaps = generateSourceMaps(configurations);

    if (sourceMaps) {
        debug('Babel plugin module namespace is using source maps: ', sourceMaps);
    }

    try {
        const modulePathTransform = transformModuleNamespace(modulePath, sourceFile, sourceMaps)
            || modulePath;

        if (modulePathTransform) {
            debug('Modul path is successfully resolved: %s', modulePathTransform);

            return eslintResolver.resolve(modulePathTransform, sourceFile);
        }
    } catch (e) {
        debug('An exception has been thrown: %s', e.message);
    }

    // How actually we can reach this state? Is it contains bad configuration?
    return {
        found: false
    };
};

export default resolve;
