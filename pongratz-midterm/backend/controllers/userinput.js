const Userinput = require("../models/userinput");

exports.createInput = (req, res, next) => {
  const userInput = new Userinput({
    rating: req.body.rating,
    comment: req.body.comment,
    username: req.userData.username,
    championName: req.body.championName
  });

  userInput.save()
    .then(result => {
      res.status(201).json({
        message: "Userinput created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error:err
      });
    });
}

exports.deleteInput = (req, res, next) => {
  if (req.userData.username == req.body.username) {
    const deleteQuery = Userinput.deleteOne({ _id: req.body._id});
    deleteQuery.exec();
  }
}

exports.getComments = (req, res, next) => {
  const champName = req.query.champName;
  const commentQuery = Userinput.find({ championName: champName }).sort([['date', -1]]);
  let fetchedInputs;

  commentQuery
    .then(docs => {
      fetchedInputs = docs;
    })
    .then(count => {
      res.status(200).json({
        message: "Comments fetched successfully!",
        inputs: fetchedInputs
      });
    });
}
