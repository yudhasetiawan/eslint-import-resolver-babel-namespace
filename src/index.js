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
import debugInstance from 'debug';
import eslintResolver from 'eslint-import-resolver-node';
import resolvePlugin from ':resolve';
import lookupBabelConfiguration from ':lookup-babel-configuration';

const debug = debugInstance('eslint:plugin:import-resolver-babel-namespace:resolver');

// This is required for the resolver of eslint-plugin-import
const interfaceVersion = 2;

/**
 * Find the full path to 'source', given 'file' as a full reference path.
 *
 * @param {String} modulePath The module to resolve
 * @param {String} sourceFile The source file's full path
 * @param {Object} config The configuration of this plugin
 *
 * @return {Object}
 */
const resolve = (modulePath, sourceFile, config = {}) => {
    let results = {
        found: false
    };

    try {
        results = resolvePlugin(modulePath, sourceFile, config);
    } catch (error) {
        debug('An exception has been thrown: %s', error.message);
    }

    if (results.found) {
        return results;
    }

    return eslintResolver.resolve(modulePath, sourceFile, config);
};

export {
    interfaceVersion,
    lookupBabelConfiguration,
    resolve,
};

export default {
    interfaceVersion,
    resolve,
};
