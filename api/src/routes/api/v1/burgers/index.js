const contentful = require('contentful');

const client = contentful.createClient({
  accessToken: '179a75a21a4810aef752bbe1fa82644dd74c63748dd913194a2a0f5ed6d7437f',
  space: 'p0n1urpxwob7',
});

function getAllBurgers(req, res) {
  client
    .getEntries({
      content_type: 'burger',
    })
    .then((response) => {
      console.dir(response.items, { depth: null });
      res.json({
        burgers: response.items.map(item => ({
          name: item.fields.name,
          description: item.fields.description,
          reviews: item.fields.reviews.map(review => ({
            title: review.fields.title,
            body: review.fields.body,
            user: review.fields.user,
          })),
        })),
      });
    })
    .catch(err => console.log(err));
}

module.exports = {
  getAllBurgers,
};
