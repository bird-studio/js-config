<p align="center">
  <a href="https://github.com/bird-studio/js-config">
    <img src="https://github.com/bird-studio/js-config/blob/main/media/logo.png"/>
  </a>
</p>

<p align="center">
  <a href="https://semantic-release.gitbook.io/semantic-release/">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://gitmoji.dev">
    <img src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square" alt="Gitmoji">
  </a>
</p>

## Usage

```bash
npm i -D @bird-studio/js-config
```

```js
// babel.config.js;

/** @type {import('@babel/core').TransformOptions} */
module.exports = require("@bird-studio/js-config").babelConfig;
```

```js
// jest.config.js

/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = require("@bird-studio/js-config").jestConfig.nextJs;

/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = require("@bird-studio/js-config").jestConfig.node;
```

```js
// next.config.js

/** @type {import('next').NextConfig} */
module.exports = require("@bird-studio/js-config").nextConfig;
```

```json
// tsconfig.json

{
  "extends": "@bird-studio/js-config/tsConfig/tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "lib",
    "baseUrl": "src",
    "paths": {
      "~/*": ["./*"]
    }

    // ....
  }
}
```
