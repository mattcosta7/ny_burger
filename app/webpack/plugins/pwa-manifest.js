const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

module.exports = new WebpackPwaManifest({
  name: 'New York Burger Blog',
  short_name: 'NY Burger',
  start_url: 'http://localhost:3001',
  description: 'The New York Burger Blog',
  background_color: '#ffffff',
  display: 'standalone',
  theme_color: '#f0f0f0',
  icons: [
    {
      src: path.resolve('src/assets/favicon/android-chrome-144x144.png'),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
    },
    // {
    //   src: path.resolve('src/assets/large-icon.png'),
    //   size: '1024x1024', // you can also use the specifications pattern
    // },
  ],
});
