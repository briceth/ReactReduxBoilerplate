const path = require('path');

module.exports = {
  entry: './static/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './static/dist')
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './static/dist'
   },
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
        use: 'babel-loader',
        test: /\.js$/,
      },
     ]
   }
};
