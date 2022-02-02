import * as Joi from '@hapi/joi'

export const configValidationSchema = Joi.object({
  // APP
  PORT: Joi.number().default(3000),

  // DB
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required()
})
