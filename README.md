# eslint-import-resolver-babel-namespace

[![Build Status][travis-image]][travis-url] [![npm][npm-badge-version]][npm-url] [![Coverage Status][coverage-image]][coverage-url]

A [babel-plugin-namespace][babel-namespace] resolver for [eslint-plugin-import][eslint-plugin-import].

## Installation

```sh
npm install --save-dev eslint-plugin-import eslint-import-resolver-babel-namespace
```

## Usage

Inside your `.eslintrc` file, pass this resolver to `eslint-plugin-import`:
```
"settings": {
  "import/resolver": {
    "babel-namespace": {}
  }
}
```

## License

MIT, see [LICENSE](LICENSE) for details.

[npm-badge-version]: https://img.shields.io/npm/v/eslint-import-resolver-babel-namespace.svg
[npm-url]: https://npmjs.com/package/eslint-import-resolver-babel-namespace
[travis-image]: https://travis-ci.org/yudhasetiawan/eslint-import-resolver-babel-namespace.svg?branch=master
[travis-url]: https://travis-ci.org/yudhasetiawan/eslint-import-resolver-babel-namespace
[babel-namespace]: https://npmjs.com/package/babel-plugin-namespace
[babel-plugin-namespace]: https://github.com/yudhasetiawan/babel-plugin-namespace
[eslint-plugin-import]: https://npmjs.com/package/eslint-plugin-import
[coverage-image]: https://coveralls.io/repos/github/yudhasetiawan/eslint-import-resolver-babel-namespace/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/yudhasetiawan/eslint-import-resolver-babel-namespace?branch=master
