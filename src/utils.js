/**
 * UTILITIES
 * =========
 */
import fs from 'fs';
import path from 'path';
import debugInstance from 'debug';

const debug = debugInstance('eslint:plugin:import-resolver-babel-namespace:map-babel-namespace');

/**
 * Cache storage
 *
 * @type {Object}
 */
const cache = {
    readFile: {},
    isPathExists: {},
};

/**
 * Check if file exists.
 *
 * @param {String} filename
 *
 * @return {Boolean}
 */
const isPathExists = (filename) => {
    if (!filename) {
        return false;
    }

    if (!cache.isPathExists[filename]) {
        cache.isPathExists[filename] = fs.existsSync(filename);
    }

    return cache.isPathExists[filename];
};

/**
 * Read the given filename.
 *
 * @param {String} filename
 *
 * @return {Object}
 */
const readFile = (filename) => {
    if (!filename) {
        throw new Error('filename must be a string');
    }

    if (!cache.readFile[filename]) {
        cache.readFile[filename] = fs.readFileSync(filename, 'utf8');
    }

    return cache.readFile[filename];
};

/**
 * The purpose of this module, is to find the project's file and cache whenever an option changes.
 * The lookup logic is starting from the directory of the reference file.
 *
 * @param {String} directory
 * @param {String} filename
 *
 * @return {Object}
 */
const lookup = (directory, filename) => {
    if (!directory) {
        return null;
    }

    const lookupPath = path.join(directory, filename);

    debug('Lookup: %s', lookupPath);

    if (isPathExists(lookupPath)) {
        return {
            content: readFile(lookupPath),
            lookupPath,
        };
    }

    const parentDirectory = path.dirname(directory);

    // We are in root stop the loop or maybe we are has been in the root of the project directory
    if (parentDirectory === directory) {
        debug('Lookup: has been reached the root directory. Cannot resolve file: ', filename);

        return null;
    }

    return lookup(parentDirectory, filename);
};

export {
    isPathExists,
    lookup,
};
