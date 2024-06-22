const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../../models/students");

router.get("/", (req, resp) => {
  Student.find()
    .then((result) => {
      console.log(result);
      resp.status(200).json({
        message: "Student fetched successfully",
        students: result,
      });
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.post("/", (req, resp) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    email: req.body.email,
    password: req.body.password,
  });

  student
    .save()
    .then((result) => {
      resp.status(201).json({
        message: "Student created successfully",
        createdStudent: result,
      });
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.get("/:id", (req, resp) => {
  const id = req.params.id;
  Student.findById(id)
    .then((result) => {
      if (result != null) {
        resp.status(200).json({
          message: `Student with id : ${id} fetched successfullt`,
          student: result,
        });
      } else {
        resp.status(500).json({
          message: `No student present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.patch("/:id", (req, resp) => {
  const id = req.params.id;
  Student.findById(id)
    .then((result) => {
      if (result != null) {
        Student.update({ _id: id }, { $set: req.body });
      } else {
        resp.status(500).json({
          message: `No student present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

router.delete("/:id", (req, resp) => {
  const id = req.params.id;
  Student.findById(id)
    .then((result) => {
      if (result != null) {
        Student.remove({ _id: id });
      } else {
        resp.status(500).json({
          message: `No student present with this id`,
        });
      }
    })
    .catch((err) => resp.status(500).json({ error: err.message }));
});

module.exports = router;
