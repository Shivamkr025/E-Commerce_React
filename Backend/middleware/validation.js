import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name should be at least 3 characters long",
        "string.max": "Name should not exceed 50 characters",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Email must be a valid email address",
    }),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password should be at least 8 characters long",
            "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
        }),
    isAdmin: Joi.boolean().required().messages({
        "boolean.base": "isAdmin must be a boolean value",
        "any.required": "isAdmin is required",
    }),
    address: Joi.object({
        street: Joi.string().min(3).required().messages({
            "string.empty": "Street is required",
            "string.min": "Street should be at least 3 characters long",
        }),
        city: Joi.string().min(2).required().messages({
            "string.empty": "City is required",
            "string.min": "City should be at least 2 characters long",
        }),
        state: Joi.string().min(2).required().messages({
            "string.empty": "State is required",
            "string.min": "State should be at least 2 characters long",
        }),
        zipCode: Joi.string()
            .pattern(new RegExp("^[0-9]{5,6}$"))
            .required()
            .messages({
                "string.empty": "ZIP code is required",
                "string.pattern.base": "ZIP code must be a 5 or 6 digit number",
            }),
        country: Joi.string().min(2).required().messages({
            "string.empty": "Country name is required",
            "string.min": "Country should be at least 2 characters long",
        }),
    }).required().messages({
        "object.base": "Address must be an object",
        "any.required": "Address is required",
    }),
    phone: Joi.string()
        .pattern(new RegExp("^[0-9]{10}$"))
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be a valid 10-digit number",
        }),
});
