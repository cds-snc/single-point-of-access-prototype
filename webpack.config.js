const path = require('path')

module.exports = (env, argv) => {
  const { getConfig } = require('@cds-snc/webpack-starter')
  const config = getConfig({
    mode: argv.mode,
    entry: {
      start: './routes/start/js/start.js',
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'public/js/dist'),
    },
  })

  return config
}
