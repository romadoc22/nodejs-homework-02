const { Schema, model } = require("mongoose");
const Joi = require("joi");

const nameRegexp = /^[\p{Script=Latin}\p{Script=Cyrillic}\s]*$/u;
const phoneRegexp = /^[0-9 ()+-]+$/;
const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// Схема моделі для контакту
const contactSchema = new Schema(
  {
    name: {
      type: String,
      validate: {
        validator: function (name) {
          return nameRegexp.test(name);
        },
        message: 'name is not a valid!',
      },
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      validate: {
        validator: function (email) {
          return emailRegexp.test(email);
        },
        message: 'email is not a valid!',
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (phone) {
          return phoneRegexp.test(phone);
        },
        message: 'phone is not a valid!',
      },
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Contact = model("Contact", contactSchema);

// Валідатори отриманих з клієнта даних
const contactValidator = Joi.object({
  name: Joi.string().required().messages({
    "any.required": 'missing required name field',
  }),
  email: Joi.string().required().messages({
    "any.required": 'missing required email field',
  }),
  phone: Joi.string().required().messages({
    "any.required": 'missing required phone field',
  }),
  favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": 'missing field favorite',
  }),
});

const schemas = { contactValidator, updateFavorite };

// Функція для оновлення поля favorite контакту

// async function updateStatusContact(contactId, body) {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
//       new: true,
//     });
//     return updatedContact;
//   } catch (error) {
//     return null;
//   }
// }

module.exports = { schemas, Contact };





// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const nameRegexp = /^[\p{Script=Latin}\p{Script=Cyrillic}\s]*$/u;
// const phoneRegexp = /^[0-9 ()+-]+$/;
// const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

// // Валідатор даних на сервері
// const schemaDBContactValidator = new Schema(
//   {
//     name: {
//       type: String,
//       validate: {
//         validator: function (name) {
//           return nameRegexp.test(name);
//         },
//         message: 'name is not a valid!',
//       },
//       required: [true, 'Set name for contact'],
//     },
//     email: {
//       type: String,
//       validate: {
//         validator: function (email) {
//           return emailRegexp.test(email);
//         },
//         message: 'email is not a valid!',
//       },
//     },
//     phone: {
//       type: String,
//       validate: {
//         validator: function (phone) {
//           return phoneRegexp.test(phone);
//         },
//         message: 'phone is not a valid!',
//       },
//     },
//     favorite: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true, versionKey: false }
// );

// // Middleware обробки помилки валідації на сервері. Додаємо статус помилки, оскільки MongoDB повертає помилку без статусу
// schemaDBContactValidator.post("save", (error, data, next) => {
//   error.status = 400;
//   next();
// });

// const Contact = model("contact", schemaDBContactValidator);

// // Валідатори отриманих з клієнта даних
// const contactValidator = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": 'missing required name field',
//   }),
//   email: Joi.string().required().messages({
//     "any.required": 'missing required email field',
//   }),
//   phone: Joi.string().required().messages({
//     "any.required": 'missing required phone field',
//   }),
//   favorite: Joi.boolean(),
// });

// const updateFavorit = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = { contactValidator, updateFavorit };

// module.exports = { schemas, Contact };


// const { putContact } = require("../controllers/contacts");

// // Middleware для оновлення поля favorite контакту
// const updateContactFavorite = (req, res) => {
//   const { contactId } = req.params;
//   const { favorite } = req.body;

//   if (favorite === undefined) {
//     return res.status(400).json({ message: "missing field favorite" });
//   }

//   // Викликаємо функцію для оновлення контакту
//   const updatedContact = putContact(contactId, req.body);

//   if (updatedContact) {
//     return res.status(200).json(updatedContact);
//   } else {
//     return res.status(404).json({ message: "Not found" });
//   }
// };

// module.exports = updateContactFavorite;