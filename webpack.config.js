let path = require('path')
let HtmlPlugin = require('html-webpack-plugin')

let options = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve('./dist')
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    hot: true,
    open: true,
    port: '3000'
  }
}
module.exports = options