import Joi from 'joi';

const DeleteBookSchema = Joi.object({
    password: Joi.string().min(3).required(),
});

export { DeleteBookSchema };
