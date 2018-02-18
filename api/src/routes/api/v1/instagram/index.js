const fetch = require('isomorphic-fetch');

const NY_BURGER_BLOG_IG_ID = 5762816323;
const COUNT = 20;

function transformApiData(data) {
  console.log('fetched');
  const { page_info, edges } = data.user.edge_owner_to_timeline_media;
  if (!edges || !edges.length) return {};
  const media = edges.map(({ node }) => ({
    id: node.id,
    description:
      node.edge_media_to_caption.edges[0] && node.edge_media_to_caption.edges[0].node.text,
    image: node.display_url,
    thumbnails: [...node.thumbnail_resources],
    thumbnail: node.thumbnail_src,
    takenAt: node.taken_at_timestamp,
  }));
  return {
    data: {
      page_info,
      media,
    },
  };
}

function getInstagramBurgerData(req, res) {
  const cursor = req.query.cursor || null;
  const url = `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${NY_BURGER_BLOG_IG_ID}","first":"${COUNT}","after":${cursor}}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => res.data)
    .then(transformApiData)
    .then(data => res.status(200).json(data))
    .catch(err => res.json({ err }));
}

function getLatestInstagramData(req, res) {
  const cursor = req.query.cursor || null;
  const url = `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${NY_BURGER_BLOG_IG_ID}","first":"1","after":null}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => res.data)
    .then(transformApiData)
    .then(data => res.status(200).json(data))
    .catch(err => res.json({ err }));
}

module.exports = {
  getInstagramBurgerData,
  getLatestInstagramData,
};

/* found this hacky query online */
