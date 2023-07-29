const { generateHTTPError } = require("../helpers");

const validateBody = (schema, errorMessage) => { 
  const func = (req, res, next) => {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      return res.status(400).json({ message: "Missing fields" }); 
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(generateHTTPError(400, error.message));
    }
    next();
  };
  return func;
};

const updateBody = (schema, errorMessage) => { 
  const func = (req, res, next) => {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
      return res.status(400).json({ message: "missing field favorite" }); 
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(generateHTTPError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = {validateBody, updateBody};
