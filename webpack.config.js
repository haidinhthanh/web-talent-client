var path    = require('path');
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'build'),
    },
    module:{
        rules:[
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
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
        new hwp({template:path.join(__dirname, '/src/public/index.html')})
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: "/build",
      }
}