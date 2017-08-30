const path = require('path');

module.exports = {
  entry: './static/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './static/dist')
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './static/dist',
     port: 8008
   },
  module: {
     rules: [
       {
         test: /\.(css|scss)$/,
         exclude: /^node_modules$/,
         loader: 'style-loader!css-loader!sass-loader',
       },
       {
        use: 'babel-loader',
        test: /\.js$/,
      },
      {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   }
};
