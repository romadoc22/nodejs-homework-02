const { ctrlWrapper } = require("../helpers");
const { generateHTTPError } = require("../helpers");

const handlersDB = require("../models/contacts");



const getContacts = async (req, res) => {
  const result = await handlersDB.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await handlersDB.getContactById(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await handlersDB.removeContact(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const postContact = async (req, res) => {
  const { name, email, phone } = req.body;

  // Перевірка наявності обов'язкових полів
  if (!name) {
    return res.status(400).json({ message: "missing required name field" });
  }
  if (!email) {
    return res.status(400).json({ message: "missing required email field" });
  }
  if (!phone) {
    return res.status(400).json({ message: "missing required phone field" });
  }
  const newContact = await handlersDB.addContact(req.body);
  res.status(201).json(newContact);
};

const putContact = async (req, res) => {
  const { name, email, phone } = req.body;

  // Перевірка наявності обов'язкових полів у тілі запиту
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }

  const { id } = req.params;

  const contact = await handlersDB.updateContact(id, req.body);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
};