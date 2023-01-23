import Joi from 'joi';

const UpdateBookSchema = Joi.object({
    password: Joi.string().min(3).required(),
    text: Joi.string().required(),
});

export { UpdateBookSchema };
