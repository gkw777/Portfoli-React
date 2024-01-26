const path = require('path');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');
const Dotenv = require('dotenv-webpack');
const ESLintPlugin = require('eslint-webpack-plugin'); // eslint 사용할 경우
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';
const envPath = `./.env.${isDev ? 'development' : 'production'}`;

dotenv.config({
  path: envPath
});

const config = {
  name: 'portfolio-react-webpack', // 설정 이름
  mode: isDev ? 'development' : 'production', // production, development // 설정 모드
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        // 바벨 설정
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]],
            plugins: ['@emotion/babel-plugin']
          }
        }
      },
      {
        // css 설정
        test: /\.(sa|sc|c)ss$/i,
        use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        // 폰트 설정
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        // 이미지 설정
        test: /\.(jpg|jpeg|gif|png|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new Dotenv({ path: envPath }),
    new InterpolateHtmlPlugin({ PUBLIC_URL: '' }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'), // 템플릿 설정
      minify: true // 압축 설정
    }),
    new webpack.ProvidePlugin({
      React: 'react' // 리액트 자동 로드
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets/imgs', to: 'assets/imgs' }, { from: 'public/favicon.ico' }]
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css'
    }),
    new ESLintPlugin()
  ],
  output: {
    filename: '[name].bundle.[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: (pathData) => {
      const filepath = path.dirname(pathData.filename).split('/').slice(1).join('/');
      return `${filepath}/[name].[contenthash:8][ext]`;
    },
    clean: true
  },
  devServer: {
    // 개발 서버 설정
    static: path.resolve(__dirname, 'public'),
    port: 3002,
    hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true,
    open: false,
    historyApiFallback: true
  },
  performance: {
    hints: false
  }
};

if (config.plugins) {
  if (isDev) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
  } else {
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [{ from: 'src/assets/imgs', to: 'assets/imgs' }, { from: 'public/favicon.ico' }]
      })
    );
  }
}

module.exports = config;
