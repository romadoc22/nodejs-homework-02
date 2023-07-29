const { Contact } = require("../models/contactModel");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndRemove(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(deletedContact);
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  const { body } = req;
  try {
    const newContact = await Contact.create(body);
    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const putContact = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  putContact,
  updateStatusContact,
};
