'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: ['./src/index.tsx']
  },
  output: {
    filename: '[name].js',
    path: 'dist',
    publicPath: ''
  },
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      filename: 'index.html',
      inject: 'body'
    }),

    // reducing the number of locales moment loads saves >200k
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js', function (module) {
      return module.resource && module.resource.indexOf('node_modules') !== -1;
    }),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(require(path.resolve(__dirname, './package.json')).version),
      __ENV__: JSON.stringify(process.env.NODE_ENV),
      __CONNECTION__: JSON.stringify('system/service')
    })
  ],
  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", "jsx"], //will allow imports without extensions
  },
  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: "tslint",
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript",
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss?browsers=last 2 version',
          'sass-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(png)$/,
        loader: 'url-loader?limit=200000'
      },
    ],
    noParse: [/jszip.js$/]
  },
  tslint: {
    configFile: './tslint.json',
    emitErrors: true,
    failOnHint: false
  },
  sassLoader: {
    includePaths: './src/**/*.scss'
  }
};

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'demo') {
  webpackConfig.devServer = {
    port: 3000,
    contentBase: path.join(process.cwd(), 'src'),
    historyApiFallback: true,
    stats: {
      colors: true
    },
    noInfo: false,
    quiet: false,
    hot: true
  };

  webpackConfig.entry.app.push(
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/dev-server'
  );

}


webpackConfig.devtool = 'source-map';


if (process.env.NODE_ENV !== 'production') {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

webpackConfig.plugins.push(
  new webpack.NoErrorsPlugin()
);

module.exports = webpackConfig;
