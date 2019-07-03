const merge = require(`webpack-merge`);
const path = require(`path`);

const common = require(`./webpack.common.js`);


module.exports = merge(common, {
  mode: `development`,
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`,
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 1488,
    historyApiFallback: true
  },
  devtool: `source-map`
});
