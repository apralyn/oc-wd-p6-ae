const Sauce = require("../models/sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const imageUrl = req.protocol + "://" + req.get("host");
  const parsedSauce = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    userId: parsedSauce.userId,
    name: parsedSauce.name,
    manufacturer: parsedSauce.manufacturer,
    description: parsedSauce.description,
    mainPepper: parsedSauce.mainPepper,
    heat: parsedSauce.heat,
    imageUrl: imageUrl + "/images/" + req.file.filename,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauce
    .save()
    .then(() => {
      res.status(201).json({
        message: "Post saved successfully!",
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message || error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params.id });
  if (req.file) {
    const imageUrl = req.protocol + "://" + req.get("host");
    const parsedSauce = JSON.parse(req.body.sauce);
    sauce = {
      userId: parsedSauce.userId,
      name: parsedSauce.name,
      manufacturer: parsedSauce.manufacturer,
      description: parsedSauce.description,
      mainPepper: parsedSauce.mainPepper,
      heat: parsedSauce.heat,
      imageUrl: imageUrl + "/images/" + req.file.filename,
    };
  } else {
    sauce = {
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      description: req.body.description,
      heat: req.body.heat,
      imageUrl: req.body.imageUrl,
      mainPepper: req.body.mainPepper,
      userId: req.body.userId,
    };
  }

  Sauce.updateOne({ _id: req.params.id }, sauce)
    .then(() => {
      res.status(201).json({
        message: "Sauce updated successfully!",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message || error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images")[1];
    fs.unlink("images/" + filename, () => {
      Sauce.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: "Deleted!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
          });
        });
    });
  });
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
exports.likeSauce = (req, res, next) => {
  //TODO check if sauce exist (refer to getOneSauce)
  // if found sauce check req.body.
  Sauce.findOne({ _id: req.params.id }) //one particulare sauce.

    // ex valentina sauce; console.log(likes                                                         );
    .then((sauce) => {
      if (req.body.like == 1) {
        console.log("I like this sauce");
        //TODO check the array first if userId exist in the usersLiked[];
        //condition if userId is in the usersLike array.
          //don't change the like number. 
        //if userId does not exist, add to the array and increase the like number. 
        // add the userId to the usersLiked[] using push.
      }
      if (req.body.like == 0){
        //TODO zero will check where the userId is at in an array and decrease the amount of either like or dislike.
      }
      if(req.body.like == -1){
        console.log("I don't like this sauce");
        //TODO check the array first if userId exist in the usersDisliked[];
        //condition if userId is in the usersLike array.
          //don't change the like number. 
        //if userId does not exist, add to the array and increase the dislike number. 
        // add the userId to the usersLiked[] using push.
      }
      res.status(200).json({
        message: "I like this Sauce!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
