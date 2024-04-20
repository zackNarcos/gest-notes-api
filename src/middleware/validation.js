const joi = require("joi");

function registerValidation(data) {
  const schema = joi.object({
    nom: joi.string().min(4).required(),
    prenom: joi.string().min(4).required(),
    email: joi.string().min(6).email().required(),
    password: joi.string().min(4).required(),
    telephone: joi.string().min(8).max(14).required()
  });
  return schema.validate(data);
}

function projectValidation(data) {
  const schema = joi.object({
      title: joi.string().min(4).required(),
      link: joi.string().min(4).required(),
      technologies: joi.string().min(4).required(),
      description: joi.string().min(4).required(),
  });
  return schema.validate(data);
}


function loginValidation(data) {
  const schema = joi.object({
    email: joi.string().min(6).email().required(),
    password: joi.string().min(4).required(),
  });
  return schema.validate(data);
}

module.exports = { registerValidation, loginValidation, projectValidation };
