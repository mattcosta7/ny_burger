function getAllRestaurants(req, res) {
  res.json({
    restaurants: [],
  });
}

module.exports = {
  getAllRestaurants,
};
