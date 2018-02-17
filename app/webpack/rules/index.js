const path = require('path');
const { extractTextPluginRule } = require('../plugins/extract-text-plugin');

module.exports = ({ server = false }) => [
  {
    loader: 'babel-loader',
    exclude: [/node_modules/],
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
            minimize: process.env.NODE_ENV === 'production',
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
            minimize: process.env.NODE_ENV === 'production',
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
            minimize: process.env.NODE_ENV === 'production',
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
    test: /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[sha512:hash:base64:7].[ext]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: process.env.NODE_ENV !== 'production',
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
    loader: 'file-loader',
    query: {
      limit: 0,
      name: '[name].[ext]',
    },
  },
];
