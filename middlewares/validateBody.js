const { generateHTTPError } = require("../helpers");

const validateBody = (schema, errorMessage) => { // Додаємо другий аргумент для повідомлення про помилку
  const func = (req, res, next) => {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      return res.status(400).json({ message: errorMessage }); // Використовуємо передане повідомлення про помилку
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(generateHTTPError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
