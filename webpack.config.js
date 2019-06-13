const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 1488,
    historyApiFallback: true
  },
  resolve: {
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `json`]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`
        }
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
            limit: 10240
          }
        }
      }
    ]
  },
  devtool: `source-map`
};
