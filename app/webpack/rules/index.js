const path = require('path');
const { NODE_ENV, PRODUCTION_ENV } = require('../../config');
const { extractTextPluginRule } = require('../plugins/extract-text-plugin');

module.exports = ({ server = false }) => [
  {
    loader: 'babel-loader',
    exclude: [/node_modules/, /\.html$/],
    include: [path.resolve('./src')],
    options: {
      plugins: [server ? 'dynamic-import-node' : 'dynamic-import-webpack'],
    },
  },
  {
    test: /\.css$/,
    include: /node_modules/,
    use: extractTextPluginRule({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            minimize: NODE_ENV === PRODUCTION_ENV,
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }),
  },
  {
    test: /\.css$/,
    exclude: /node_modules/,
    use: extractTextPluginRule({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]_[local]__[hash:base64:5]',
            minimize: NODE_ENV === PRODUCTION_ENV,
            importLoaders: 1,
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }),
  },
  {
    test: /\.scss$/,
    use: extractTextPluginRule({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            modules: true,
            sourceMap: true,
            importLoaders: 2,
            localIdentName: '[name]_[local]__[hash:base64:5]',
            minimize: NODE_ENV === PRODUCTION_ENV,
          },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    }),
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    exclude: /favicon/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'assets/[name].[sha512:hash:base64:7].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: NODE_ENV !== PRODUCTION_ENV,
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
  },
  {
    test: /\.(png|jpg|gif|svg)$/,
    include: /favicon/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[sha512:hash:base64:7].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: NODE_ENV !== PRODUCTION_ENV,
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          optipng: {
            enabled: true,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
    ],
  },
  {
    test: /\.ico$/,
    use: {
      loader: 'file-loader',
      query: {
        limit: 0,
        name: 'assets/[name].[sha512:hash:base64:7].[ext]',
      },
    },
  },
  {
    test: /\.(xml$|webmanifest$)/,
    use: {
      loader: 'file-loader',
      query: {
        limit: 0,
        name: 'assets/[name].[sha512:hash:base64:7].[ext]',
      },
    },
  },
  // {
  //   test: /\.html$/,
  //   use: {
  //     loader: 'html-loader',
  //   },
  // },
];
