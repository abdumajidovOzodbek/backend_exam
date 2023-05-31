import Joi from 'joi';


export const LoginSchema = Joi.object({
  admin: Joi.string().required(),
  password: Joi.string().required()
})


export const PostSchema = Joi.object({
    first_name: Joi.string()
    .min(2)
    .max(32)
    .pattern(new RegExp('^[a-z0-9]{3,30}$'))
    .required(),
    last_name: Joi.string().min(8).max(100).required(),
    subcategory_id:Joi.number().required(),
    description:Joi.string().min(20).max(200).required(),
    title:Joi.string().min(10).max(40).required(),
    tel_number:Joi.string().pattern(/^998([378]{2}|(9[013-57-9]))\d{7}$/).required(),
    time: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/),
    profession:Joi.string().min(8).max(30).required(),
    link:Joi.string().uri(),
    image: Joi.string().pattern(new RegExp('((jpe?g|png|gif|bmp))$')).required()
});