import Model from "../models/experience.js";
import PortfolioModel from "../models/portfolio.js";

// callback functions used in author routes
//get all the Experiences
const getAllExperience = async (req, res, next) => {
  Model.find({}, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
};

//get an Experience by id

const getExperience = async (req, res, next) => {
  let { id } = req.params;
  Model.findOne({ _id: id }, (err, response) => {
    if (err) return next(err);
    res.status(200).send({ success: true, response });
  });
};

//Add new Education

const addExperience = async (req, res,next) => {
  const body = req.body;
  try {
    const newExperience = new Model(body);
    newExperience.save((err, response) => {
      if (err) return next(err);
      PortfolioModel.updateOne(
        { _id: `${process.env.PORTFOLIO_ID}` },
        { $push: { experience: newExperience._id } },
        (err, response) => {
          if (err) return next(err);
          res.status(201).send({ sucess: true, response });
        }
      );
    });
  } catch (err) {
    return res.status(400).send("Hello, world!");
  }
};

// update an Experience

const putExperience = async (req, res,next) => {
  let id = req.params.id;
  let data = req.body;
  try {
    Model.updateOne({ _id: id }, { $set: data }, (err, response) => {
      if (err) {
        return next(err);
      }
      res.status(200).send({ success: true, response });
    });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

// Delete an Experience

const deleteExperience = async (req, res, next) => {
  let id = req.params.id;
  try {
    Model.findByIdAndRemove({ _id: id }, (err, response) => {
      if (err) return next(err);
      PortfolioModel.updateOne(
        { _id: `${process.env.PORTFOLIO_ID}`},
        { $pull: { experience: `${id}` } },
        (err, response) => {
          if (err) return next(err);
          res
            .status(200)
            .send({ sucess: true, response, message: "deleted experience" });
        }
      );
    });
  } catch (error) {
    res.status(400).send({ error: true, error });
  }
};

export default {
  getAllExperience,
  getExperience,
  addExperience,
  putExperience,
  deleteExperience,
};
