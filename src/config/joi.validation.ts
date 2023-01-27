import * as Joi from 'joi';
//Joi es una libreria la cual permite realizar validaciones, en este caso la validacion en las variables de entorno

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3001),
    DEFAULT_LIMIT: Joi.number().default(6),    
})