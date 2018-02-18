import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import Entry from '../../entry/server';
import favicon from '../../assets/favicon/favicon.ico';
import favicon32 from '../../assets/favicon/favicon-32x32.png';
import favicon16 from '../../assets/favicon/favicon-16x16.png';
import safariPinnedTab from '../../assets/favicon/safari-pinned-tab.svg';
import appleTouchFavicon from '../..//assets/favicon/apple-touch-icon.png';
import msConfig from '../../assets/favicon/browserconfig.xml';

export default stats => (req, res, next) => {
  try {
    const { publicPath, assetsByChunkName, assets } = stats.clientStats;
    const { bundle, vendor, manifest } = assetsByChunkName;
    const pwaManifest = assets.find(asset => asset.name.match(/manifest/));

    const tags = [manifest, vendor, bundle].reduce(
      (acc, bundleType) => {
        if (!bundleType) return acc;
        const newAcc = Object.assign({}, acc);
        if (Array.isArray(bundleType)) {
          const bundleScripts = bundleType.filter(type => type.match(/.js$/));
          const bundleStyles = bundleType.filter(type => type.match(/.css$/));
          newAcc.styles = newAcc.styles.concat(bundleStyles);
          newAcc.scripts = newAcc.scripts.concat(bundleScripts);
        } else {
          newAcc.scripts = newAcc.scripts.concat([bundleType]);
        }
        return newAcc;
      },
      {
        styles: [],
        scripts: [],
      }
    );
    const props = {};
    return Entry(req.url, props)
      .then((reactComponent) => {
        const result = ReactDOMServer.renderToString(reactComponent);
        const helmet = Helmet.renderStatic();
        const helmetStyles = tags.styles
          .map(style => `<link href="${publicPath}${style}" rel="stylesheet" />`)
          .join('');
        const helmetScripts = tags.scripts
          .map(script => `<script src="${publicPath}${script}" defer></script>`)
          .join('');
        return res.send(`
      <!doctype html>
      <html lang="en" data-framework="react">
        <head>
          <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="apple-touch-icon" sizes="144x144" href="${appleTouchFavicon}">
          <link rel="icon" type="image/png" sizes="32x32" href="${favicon32}">
          <link rel="icon" type="image/png" sizes="16x16" href="${favicon16}">
          <link rel="mask-icon" href="${safariPinnedTab}" color="#5bbad5">
          <link rel="shortcut icon" href="${favicon}">
          <link rel="manifest" href="${publicPath}${pwaManifest.name}">
          <meta name="msapplication-TileColor" content="#da532c">
          <meta name="msapplication-config" content="${msConfig}">
          <meta name="theme-color" content="#ffffff">
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${helmetStyles}
          <script id="props" data-props="${JSON.stringify(props)}"></script>
        </head>
        <body>
          <div id="root">${result}</div>
          ${helmetScripts}
        </body>
      </html>
      `);
      })
      .catch(err => res.json({ err }));
  } catch (err) {
    res.json({ err });
  }
};
