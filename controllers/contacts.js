const { Contact } = require("../models/contactModel");
const { generateHTTPError, ctrlWrapper } = require("../helpers");

const handlersDB = require("../models/contactsHandlers");

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
  const contact = await handlersDB.addContact(req.body);
  res.status(201).json(contact);
};

const putContact = async (req, res) => {
  const { id } = req.params;

  const contact = await handlersDB.updateContact(id, req.body);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    // Оновлюємо статус поля favorite у контакту за допомогою функції `findByIdAndUpdate`
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    // Перевіряємо, чи знайдено контакт
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    // Відправляємо оновлений контакт у відповідь
    res.status(200).json(updatedContact);
  } catch (error) {
    // Обробка помилок
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
  updateFavorite,
};
