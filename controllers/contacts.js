const Contacts = require("../models/Contacts");

const createContact = async (req, res, next) => {
  const { name, email, phoneNo, image } = req.body;
  try {
    const newContact = new Contacts({
      name,
      email,
      phoneNo,
      image,
    });
    await newContact.save();
    res.status(201).json({
      contact: newContact,
      message: "Contact Created Successfully...",
    });
    console.log(newContact);
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await Contacts.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    next(err);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await Contacts.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (err) {
    next(err);
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.id;
  try {
    const contact = await Contacts.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createContact,
  updateContact,
  getContacts,
  deleteContact,
  getContactById,
};
