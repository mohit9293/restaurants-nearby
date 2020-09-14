const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'bundle.js'
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.(js|mjs)$/,
            exclude: /node_modules/,
            use: [{ loader: 'babel-loader' }],
         },
         {
           test: /\.css$/,
           use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader" ],
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './public/index.html'
      }),
      new MiniCssExtractPlugin({
          filename: `components/[name].css`
      }),
   ]
}
