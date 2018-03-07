import Promise from 'bluebird';
import fs from 'fs';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import Entry from '../../entry/server';
import logger from '../../lib/logger';

const readFileAsync = Promise.promisify(fs.readFile, { context: fs });
const templatePath =
  process.env.NODE_ENV === 'production' ? './dist/index.html' : './src/index.html';

export default stats => (req, res, next) => {
  let tags;
  const { publicPath, assetsByChunkName } = stats.clientStats;
  const { bundle, vendor, manifest } = assetsByChunkName;
  if (process.env.NODE_ENV === 'development') {
    tags = [manifest, vendor, bundle].reduce(
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
  }
  let helmetScripts;
  if (tags) {
    helmetScripts = tags.scripts
      .map(script => `<script src="${publicPath}${script}" defer></script>`)
      .join('');
  }

  const props = {};
  return Promise.all([Entry(req.url, props), readFileAsync(templatePath)])
    .spread((reactComponent, template) => {
      const result = ReactDOMServer.renderToString(reactComponent);
      const helmet = Helmet.renderStatic();
      const helmetAttributes = Object.keys(helmet)
        .map(h => helmet[h].toString())
        .join('');

      let html = template
        .toString()
        .replace('{{result}}', result || '')
        .replace('{{props}}', JSON.stringify(props))
        .replace('{{helmetAttributes}}', helmetAttributes || '')
        .replace('{{helmetScripts}}', helmetScripts || '');

      if (process.env.NODE_ENV !== 'production') {
        html = html.replace('<%=htmlWebpackPlugin.files.webpackManifest%>', '');
      }

      return res.send(html);
    })
    .catch((err) => {
      logger.error(err, { depth: null });
      res.json({ error: 'Error processing your request' });
    });
};
