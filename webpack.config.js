const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    app: './src/server.ts',
    embedPreview: './lib/embed.ts',
  },
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
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()],
}