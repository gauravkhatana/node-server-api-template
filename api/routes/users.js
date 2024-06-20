const express = require("express");
const router = express.Router();

router.get("/", (req, resp) => {
  resp.status(200).json({
    message: "User fetched successfully",
  });
});
router.post("/", (req, resp) => {
  user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    number: req.body.number,
    email: req.body.email,
    password: req.body.password,
  };
  resp.status(201).json({
    message: "User created successfully",
    user: user,
  });
});
router.get("/:id", (req, resp) => {
  const id = req.params.id;
  resp.status(200).json({
    message: `User with id : ${id} fetched successfullt`,
    id: id,
  });
});
router.delete("/:id", (req, resp) => {
  const id = req.params.id;
  resp.status(201).json({
    message: `User with id  ${id} deleted successfully`,
    id: id,
  });
});
router.put("/:id", (req, resp) => {
  const id = req.params.id;
  resp.status(200).json({
    message: `User with id: ${id} updated successfully`,
    id: id,
  });
});

module.exports = router;
