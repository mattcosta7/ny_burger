const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = new WebpackPwaManifest({
  publicPath:
    process.env.NODE_ENV === 'production' ? 'https://d3fels6wqsoo93.cloudfront.net/' : '/',
  filename: 'manifest.json',
  name: 'New York Burger Blog',
  short_name: 'NY Burger Blog',
  description:
    'Taking on NYC one Burger at a time. With a cast of Burger experts telling you what you need to put in your mouth across the city.',
  background_color: '#ffffff',
  start_url: 'https://www.nyburgerblog.com/index.html',
  theme_color: '#063861',
  fingerprints: true,
  ios: true,
  orientation: 'portrait',
  display: 'standalone',
  icons: [
    {
      src: path.resolve('./src/assets/favicon/android-chrome-144x144.png'),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      destination: path.join('assets'),
    },
    // {
    //   src: path.resolve('src/assets/large-icon.png'),
    //   size: '1024x1024', // you can also use the specifications pattern
    // },
  ],
});
