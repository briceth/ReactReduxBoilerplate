const path = require('path');

module.exports = {
  entry: './static/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './static/dist'),
  },
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  devServer: {
    contentBase: './static/dist',
    port: 8008,
    proxy: [
      {
        context: ['/ad', '/api'],
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
