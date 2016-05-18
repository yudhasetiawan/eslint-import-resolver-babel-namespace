/**
 * LOOKUP BABEL CONFIGURATION
 * ==========================
 */
import JSON5 from 'json5';
import debugInstance from 'debug';
import { isArray } from 'lodash';
import { lookup } from ':utils';

const debug = debugInstance('eslint:plugin:import-resolver-babel-namespace:map-babel-namespace');

/**
 * Find the source maps of the babel namespaces.
 * The lookup babel configuration logic is starting from the directory of the file being transpiled.
 *
 * @see http://babeljs.io/docs/usage/babelrc/#lookup-behavior
 *
 * @param {String} directory
 * @return {Object|null}
 */
const lookupBabelConfiguration = (directory) => {
    if (!directory) {
        return null;
    }

    debug('Resolving a babel configuration at ', directory);

    const babelrc = lookup(directory, '.babelrc');

    if (!babelrc || !babelrc.content) {
        debug('Babel configuration is not found');

        return null;
    }

    const babelrcJson = JSON5.parse(babelrc.content);

    if (babelrcJson && isArray(babelrcJson.plugins)) {
        const namespacePlugin = babelrcJson.plugins.find((plugin) => {
            let pluginName = plugin;

            if (isArray(pluginName)) {
                pluginName = pluginName[0];
            }

            return pluginName === 'namespace';
        });

        if (namespacePlugin) {
            let pluginConfig = {};

            if (isArray(namespacePlugin)) {
                pluginConfig = namespacePlugin[1];
            }

            debug(
                'Babel plugin module namespace is enabled using configuration: ',
                pluginConfig
            );

            return pluginConfig;
        }
    }

    debug('Babel plugin module namespace is not enabled');

    return null;
};

export default lookupBabelConfiguration;
