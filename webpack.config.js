var path    = require('path');
var hwp     = require('html-webpack-plugin');
var webpack = require('webpack');
const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
config = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist'),
        publicPath: '/'
    },
    module:{
        rules:[
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'react-hmre'],
                    plugins: ['transform-class-properties']
                  }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
        ]
    },
    plugins:[
        new hwp({template:path.join(__dirname, '/public/index.html')}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title: 'Hot Module Replacement',
        }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
      }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;




// module.exports = {
//   entry: {
//      app: './src/index.js',
// -      print: './src/print.js',
//   },
//   devtool: 'inline-source-map',
//   devServer: {
//     contentBase: './dist',
// +     hot: true,
//   },
//   plugins: [
//     // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       title: 'Hot Module Replacement',
//     }),
//   ],
//   output: {
//     filename: '[name].bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };