const Champion = require("../models/champion");

exports.championDetails = (req, res, next) => {
  const searchTerm = req.query.key;
  const championQuery = Champion.find({ key: searchTerm });
  let fetchedChampions;

  championQuery
    .then(documents => {
      fetchedChampions = documents;
      return Champion.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Champions fetched successfully!",
        champions: fetchedChampions,
        maxChampions: count
      });
    });
}

exports.champions = (req, res, next) => {
  let championQuery;
  let fetchedChampions;

  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const filter = req.query.filter;

  if (filter == "name") {
    championQuery = Champion.find().sort({ [filter]: "1" });
  }
  else {
    championQuery = Champion.find().sort({ [filter]: "-1"});
  }

  if (pageSize && currentPage) {
    championQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  championQuery
    .then(documents => {
      fetchedChampions = documents;
      return Champion.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Champions fetched successfully!",
        champions: fetchedChampions,
        maxChampions: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching champions failed!"
      });
    });
}

exports.championSearch = (req, res, next) => {
  const searchTerm = req.query.id.toString().toLowerCase();
  const championQuery = Champion.find({ name: { $regex: searchTerm, $options: "i" } }).sort({ name: "1"});
  let fetchedChampions;

  championQuery
    .then(documents => {
      fetchedChampions = documents;
      return Champion.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Champions fetched successfully!",
        champions: fetchedChampions,
        maxChampions: count
      });
    });
}
