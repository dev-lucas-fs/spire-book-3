import Joi from 'joi';

const CreateBookSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
});

export { CreateBookSchema };
