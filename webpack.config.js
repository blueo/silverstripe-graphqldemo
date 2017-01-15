var webpack = require('webpack');
var PRODUCTION = process.env.NODE_ENV === 'production';

var devPlugins = [];
var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: false,
        warnings: false,
      },
      output: {
        beautify: false,
        semicolons: false,
        comments: false,
        max_line_len: 200,
      },
    }),
	new webpack.DefinePlugin({
	  "process.env": {
	     NODE_ENV: JSON.stringify("production")
	   }
	})
];

module.exports = {
  entry: {
    graphqldemo: './client/src'
  },
  output: {
    path: './client/dist',
    filename: 'graphqldemo.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
          //comments: false,
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [

  ].concat(PRODUCTION ? prodPlugins : devPlugins)
};
