import ReactDOMServer from "react-dom/server";
import Helmet from "react-helmet";
import Entry from "../../entry/server";
import favicon from "../../assets/favicon.ico";

export default stats => (req, res, next) => {
  const { publicPath } = stats.clientStats;
  const { bundle, vendor, manifest } = stats.clientStats.assetsByChunkName;

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
      scripts: []
    }
  );
  const props = {};
  return Entry(req.url, props)
    .then(reactComponent => {
      const result = ReactDOMServer.renderToString(reactComponent);
      const helmet = Helmet.renderStatic();
      return res.send(`
      <!doctype html>
      <html lang="en" data-framework="react">
        <head>
          <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
          <meta charset="utf-8">
          <link rel="icon" href="${favicon}" type="image/x-icon" />
          <link rel="shortcut icon" type="image/png" href="${favicon}" />
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          ${tags.styles
            .map(
              style => `<link href="${publicPath}${style}" rel="stylesheet" />`
            )
            .join("")}
          <script id="props" data-props="${JSON.stringify(props)}"></script>
        </head>
        <body>
          <div id="root">${result}</div>
          ${tags.scripts
            .map(
              script => `<script src="${publicPath}${script}" defer></script>`
            )
            .join("")}
        </body>
      </html>
      `);
    })
    .catch(err => res.json({ err }));
};
