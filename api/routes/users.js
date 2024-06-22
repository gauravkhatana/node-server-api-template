const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../../models/users");

router.get("/", (req, resp) => {
  User.find()
    .then((result) => {
      console.log(result);
      resp.status(200).json({
        message: "User fetched successfully",
        users: result,
      });
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.post("/", (req, resp) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then((result) => {
      resp.status(201).json({
        message: "User created successfully",
        createdUser: result,
      });
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.get("/:id", (req, resp) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      if (result != null) {
        resp.status(200).json({
          message: `User with id : ${id} fetched successfullt`,
          user: result,
        });
      } else {
        resp.status(500).json({
          message: `No user present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.patch("/:id", (req, resp) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      if (result != null) {
        User.update({ _id: id }, { $set: req.body });
      } else {
        resp.status(500).json({
          message: `No user present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, resp) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      if (result != null) {
        User.remove({ _id: id });
      } else {
        resp.status(500).json({
          message: `No user present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

module.exports = router;
