import joi from 'joi';

export const flowSchema = joi.object({
	value: joi.number().required(),
	description: joi.string().required(),
	type: joi.string().valid('inlet', 'outlet').required(),
});