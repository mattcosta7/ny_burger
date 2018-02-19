const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = new WebpackPwaManifest({
  filename: 'manifest.json',
  name: 'My Progressive Web App',
  short_name: 'MyPWA',
  description: 'My awesome Progressive Web App!',
  background_color: '#ffffff',
  start_url: '/',
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
