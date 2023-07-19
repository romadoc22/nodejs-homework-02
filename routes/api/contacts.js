const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
} = require("../../controllers/controllers");

const { createUserDataValidator } = require("../../schemas");
const { validateBody } = require("../../middlewares");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", validateBody(createUserDataValidator), postContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateBody(createUserDataValidator), putContact);

module.exports = router;