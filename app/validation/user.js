let Joi = require('joi')
module.exports = function (model) {
    var module = {};

    module.userRegister = function (req, res, next) {

        try {
            console.log("req.body>>>>>>>", req.body);
            let userRegisterss = Joi.object({
                username: Joi.string().required().messages({
                    'string.empty': "Username can't be an empty",
                    'string.required': "Email must be required",
                }),
                email: Joi.string().email().messages({
                    'string.empty': "Email can't be an empty",
                    'string.email': "Email is not valid",
                    'string.required': "Email must be required",
                }),
                password: Joi.string().min(3).max(20).messages({
                    'string.empty': "Email can't be an empty",
                    'string.min': "Your password must be least 3 characters long",
                    'string.max': "Your password cannot exceed 20 characters",
                    'string.required': "Password must be required",
                }),
            });

            const { error, value } = userRegisterss.validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                console.log("error", error);
                return res.send({
                    status: "fail",
                    result: {},
                    message: error.details[0].message
                });
            }

            next()

        } catch (error) {
            console.log("User validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }

    }

    module.userLogin = function (req, res, next) {

        try {

            let userLogin = Joi.object({
                email: Joi.string().required().empty().email().messages({
                    'string.empty': "Email can't be an empty",
                    'string.email': "Email is not valid",
                    'string.required': "Email must be required",
                }),
                password: Joi.string().required().empty().min(3).max(20).messages({
                    'string.empty': "password can't be an empty",
                    'string.min': "Your password must be least 3 characters long",
                    'string.max': "Your password cannot exceed 20 characters",
                    'string.required': "Password must be required",
                }),
            });

            const { error, value } = userLogin.validate(req.body, {
                abortEarly: false,
            });

            if (error) {
                console.log("error", error);
                return res.send({
                    status: "fail",
                    result: {},
                    message: error.message
                });
            }

            next()

        } catch (error) {
            console.log("adminLogin validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }

    }

    return module;
}
