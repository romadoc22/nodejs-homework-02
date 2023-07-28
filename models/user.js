const { Schema, model } = require("mongoose");
const Joi = require("joi");

const STATUS_SUBSCRIPTION = {
  STARTER: "starter",
  PRO: "pro",
  BUSINESS: "business",
};

// Валідатор даних на сервері
const schemaDBUserValidator = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [
        STATUS_SUBSCRIPTION.STARTER,
        STATUS_SUBSCRIPTION.PRO,
        STATUS_SUBSCRIPTION.BUSINESS,
      ],
      default: STATUS_SUBSCRIPTION.STARTER,
    },
    token: { type: String, default: "" },
  },
  { timestamps: true, versionKey: false }
);

const User = model("user", schemaDBUserValidator);

// Валідатори отриманих з клієнта даних
const userValidator = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

const userSubscriptionValidator = Joi.object({
  subscription: Joi.valid(...Object.values(STATUS_SUBSCRIPTION)).required(),
});

const schemas = { userValidator, userSubscriptionValidator };

module.exports = { schemas, User };











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
//         message: "name is not a valid!",
//       },
//       required: [true, "Set name for contact"],
//     },
//     email: {
//       type: String,
//       validate: {
//         validator: function (email) {
//           return emailRegexp.test(email);
//         },
//         message: "email is not a valid!",
//       },
//     },
//     phone: {
//       type: String,
//       validate: {
//         validator: function (phone) {
//           return phoneRegexp.test(phone);
//         },
//         message: "phone is not a valid!",
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
//     "any.required": "missing required name field",
//   }),
//   email: Joi.string().required().messages({
//     "any.required": "missing required email field",
//   }),
//   phone: Joi.string().required().messages({
//     "any.required": "missing required phone field",
//   }),
//   favorite: Joi.boolean(),
// });

// const updateFavorit = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = { contactValidator, updateFavorit };

// module.exports = { schemas, Contact };
