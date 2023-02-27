const express = require("express");
const {
  createContact,
  updateContact,
  getContacts,
  deleteContact,
} = require("../controllers/contacts");

const router = express.Router();

router.route("/create-contact").post(createContact);

router.route("/update-contact/:id").patch(updateContact);

router.route("/").get(getContacts);

router.route("/delete-contact/:id").delete(deleteContact);

module.exports = router;
