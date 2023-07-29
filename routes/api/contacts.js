const express = require("express");
const router = express.Router();

const { isValidId, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contactModel");
const { updateFavorite } = require("../../controllers");

const {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  
} = require("../../controllers");

router.get("/", getContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", validateBody(schemas.contactValidator), postContact);

router.delete("/:id", isValidId, deleteContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.contactValidator, "missing required name field"),
  putContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavorite),
  updateFavorite
);


module.exports = router;
