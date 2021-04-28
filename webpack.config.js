const path = require('path')
const nodeExternals = require('webpack-node-externals')

// Return Array of Configurations
module.exports = [
  {
    name: "embedPreview",
    entry: './lib/embed.ts',
    target: 'node',
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    externals: [nodeExternals()],
    output: {
      filename: 'embedPreview.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'embedPreview',
      libraryTarget: 'window',
      libraryExport: 'default'
    },
  },
  {
    name: "app",
    entry: './src/server.ts',
    target: 'node',
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    externals: [nodeExternals()],
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'dist'),
    },
  }
];