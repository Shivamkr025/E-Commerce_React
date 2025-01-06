export const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors = error.details.map((err) => err.message); // Collect all error messages
        return res.status(400).json({ errors });
      }
      next();
    };
  };
  