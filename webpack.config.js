const Path = require('path');
const webpackConfig = require('@silverstripe/webpack-config');
const {
  resolveJS,
  externalJS,
  moduleJS,
  pluginJS
} = webpackConfig;

const ENV = process.env.NODE_ENV;
const PATHS = {
  MODULES: 'node_modules',
  FILES_PATH: '../',
  ROOT: Path.resolve(),
  SRC: Path.resolve('client/src'),
  DIST: Path.resolve('client/dist'),
};

const externals = externalJS(ENV, PATHS);
delete externals.reactstrap;

const config = [
  {
    name: 'js',
    entry: {
        tinymce_plugin: `${PATHS.SRC}/js/tinymce_plugin.js`
    },
    output: {
      path: PATHS.DIST,
      filename: 'js/[name].js',
    },
    resolve: resolveJS(ENV, PATHS),
    externals,
    module: moduleJS(ENV, PATHS),
    plugins: pluginJS(ENV, PATHS)
  }
];

// Use WEBPACK_CHILD=js or WEBPACK_CHILD=css env var to run a single config
module.exports = (process.env.WEBPACK_CHILD)
  ? config.find((entry) => entry.name === process.env.WEBPACK_CHILD)
  : module.exports = config;
