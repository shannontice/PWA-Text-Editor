const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template: './install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      new WebpackPwaManifest ({
        name: 'PWA Text Editor',
        short_name: 'PWA Text',
        description: 'App to create notes with or without internet connection',
        background_color: '##FCFFFD',
        theme_color: '#DAFFEF',
        icons: [{
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 256, 512],
          destination: path.join('images', 'logos')
        }]
      }),

      new InjectManifest ({
        swSrc: './src/sw.js',
        swDest: 'sw.js'
      })
    ],

    module: {
      // Add CSS Loader and Babel Config here
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\/js$/,
          exclude: /node_modules/,
          use:{
            loader: 'babel-loader',
            options: {
              presents: ['babel/present-env']
            }
          }
        }
      ],
    },
  };
};
