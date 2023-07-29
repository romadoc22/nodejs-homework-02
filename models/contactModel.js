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

module.exports = { schemas, Contact };