const path = require(`path`);
const HtmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  entry: `./src/index.tsx`,
  resolve: {
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `json`]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: `babel-loader`
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: {
          loader: `url-loader`,
          options: {
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `public/index.html`),
      inject: `body`
    })
  ]
};
