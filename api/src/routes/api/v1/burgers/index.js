function getAllBurgers(req, res) {
  res.json({
    burgers: [],
  });
}

module.exports = {
  getAllBurgers,
};
