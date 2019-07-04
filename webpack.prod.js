const CopyPlugin = require(`copy-webpack-plugin`);
const merge = require(`webpack-merge`);
const path = require(`path`);

const common = require(`./webpack.common.js`);


module.exports = merge(common, {
  mode: `production`,
  output: {
    path: path.join(__dirname, `build`),
    filename: `bundle.min.js`,
  },
  plugins: [
    new CopyPlugin([
      {
        from: `public/css/style.min.css`,
        to: path.resolve(__dirname, `build/css`)
      },
      {
        from: `public/img`,
        to: path.resolve(__dirname, `build/img`)
      },
      {
        from: `public/favicon.ico`,
        to: path.resolve(__dirname, `build`)
      }
    ])
  ]
});
