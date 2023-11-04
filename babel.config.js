const createDefaultConfig = require('shakapacker/package/babel/preset.js');

module.exports = function(api) {
  const defaultConfig = createDefaultConfig(api);
  const validEnv = ['development', 'test', 'production']
  const currentEnv = api.env()
  const isDevelopmentEnv = api.env('development')
  const isProductionEnv = api.env('production')
  const isTestEnv = api.env('test')

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      `Please specify a valid \`NODE_ENV\` or ` +
        `\`BABEL_ENV\` environment variables. Valid values are "development", ` +
        `"test", and "production". Instead, received: ${ 
        JSON.stringify(currentEnv) 
        }.`
    )
  }

  return {
    ...defaultConfig,
    presets: [
      ...defaultConfig.presets,
       [
        '@babel/preset-react',
        {
          development: isDevelopmentEnv || isTestEnv,
          useBuiltIns: true
        }
      ]
    ].filter(Boolean),
    plugins: [
      ...defaultConfig.plugins,
      isProductionEnv && ['babel-plugin-transform-react-remove-prop-types',
        {
          removeImport: true
        }
      ],
      process.env.WEBPACK_SERVE && 'react-refresh/babel'
    ].filter(Boolean)
  }
}
