var webpack = require('webpack')
var path = require('path');

module.exports = {
  entry: ['./app.jsx'],
  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      webworkify: 'webworkify-webpack-dropin',
    }
  },
  devtool: 'source-maps',
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
      { test: /\.json$/, loader: 'json-loader' },
      {
        include: /node_modules\/mapbox-gl.*\.js$/,
        loader: 'transform-loader?brfs-babel',
        enforce: 'post',
      },
      {
        test: /node_modules\/@mapbox\/react-geocoder[\/\\].*\.js/,
        loader: 'babel',
        query: { presets: ['react', 'es2015'] }
      }
    ]
  },
  node: {
    fs: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ]
}
