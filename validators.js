const Joi = require("joi");

const movieSchema = Joi.object({
    title: Joi.string().max(255).required(),
    director: Joi.string().max(255).required(),
    year: Joi.number().integer(),
    color: Joi.boolean().required(),
    duration: Joi.number().integer()
});


const userSchema = Joi.object({
    firstname: Joi.string().max(255).required(),
    lastname: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required()
});

const validateMovie = (req, res, next) => {
    const { title, director, year, color, duration } = req.body;

    const { error } = movieSchema.validate(
        { title, director, year, color, duration },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};

const validateUser = (req, res, next) => {
    const { firstname, lastname, email } = req.body;

    const { error } = userSchema.validate(
        { firstname, lastname, email },
        { abortEarly: false }
    );

    if (error) {
        res.status(422).json({ validationErrors: error.details });
    } else {
        next();
    }
};

module.exports = {
    validateMovie,
    validateUser,
};