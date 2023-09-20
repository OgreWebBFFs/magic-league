const { environment } = require('@rails/webpacker');

environment.loaders.get('sass').use.splice(-1, 0, {
  loader: 'resolve-url-loader',
});

// Get the actual sass-loader config
const sassLoader = environment.loaders.get('sass');
const sassLoaderConfig = sassLoader.use.find((element) => element.loader === 'sass-loader');

// Use Dart-implementation of Sass (default is node-sass)
const { options } = sassLoaderConfig;
options.implementation = require('sass');

const hotfixPostcssLoaderConfig = (subloader) => {
  const subloaderName = subloader.loader;
  if (subloaderName === 'postcss-loader') {
    subloader.options = {
      postcssOptions: subloader.options.config,
    };
  }
};

environment.loaders.keys().forEach((loaderName) => {
  const loader = environment.loaders.get(loaderName);
  loader.use.forEach(hotfixPostcssLoaderConfig);
});

module.exports = environment;
