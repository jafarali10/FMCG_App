let Joi = require('joi')
module.exports = function (model) {
    var module = {};

    module.adminLogin = function (req, res, next) {
        try {
            // console.log('yes');
            let addPlayerObj = Joi.object({
                email: Joi.string().empty().email().required().messages({
                    'string.empty': "Email can't be an empty",
                    'string.email': "Email is not valid",
                    'string.required': "Email must be required",
                }),
                password: Joi.string().empty().min(3).max(20).required().messages({
                    'string.empty': "Email can't be an empty",
                    'string.min': "Your password must be least 3 characters long",
                    'string.max': "Your password cannot exceed 20 characters",
                    'string.required': "Password must be required",
                })
            });

            const { error, value } = addPlayerObj.validate(req.body, {
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

    module.userList = function (req, res, next) {

        try {
            console.log(">>>>", req.body);
            let userList = Joi.object({
                pageNumber: Joi.number().empty().required().messages({
                    'string.empty': "PageNumber can't be an empty",
                    'string.required': "PageNumber must be required",
                }),
                length: Joi.number().empty().required().messages({
                    'string.empty': "Length can't be an empty",
                    'string.required': "Length must be required",
                }),
                search: Joi.string().allow(null, ""),
            });

            const { error, value } = userList.validate(req.body, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    module.deleteUser = function name(req, res, next) {
        try {
            console.log(">>>>", req.query);
            let deleteUser = Joi.object({
                id: Joi.string().empty().required().messages({
                    'string.empty': "Id can't be an empty",
                    'string.required': "Id must be required",
                }),
            });
            const { error, value } = deleteUser.validate(req.query, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    module.editUser = function name(req, res, next) {
        try {
            console.log(">>>>", req.body);
            let editUser = Joi.object({
                id: Joi.string().empty().required().messages({
                    'string.empty': "Id can't be an empty",
                    'string.required': "Id must be required",
                }),
                username : Joi.string().allow(null, ""),
                email :Joi.string().allow(null, ""),
                status :Joi.string().allow(null, ""),
            });
            const { error, value } = editUser.validate(req.body, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    module.productCreate = function name(req, res, next) {
        try {
            console.log(">>>>", req.body);
            let productCreate = Joi.object({
                name: Joi.string().empty().required().messages({
                    'string.empty': "Product name can't be an empty",
                    'string.required': "Product name must be required",
                }),
                price : Joi.number().empty().required().messages({
                    'string.empty': "Product price can't be an empty",
                    'string.required': "Product price must be required",
                }),
                category : Joi.string().empty().required().messages({
                    'string.empty': "Product category can't be an empty",
                    'string.required': "Product category must be required",
                }),
            });
            const { error, value } = productCreate.validate(req.body, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    module.productList = function (req, res, next) {

        try {
            console.log(">>>>", req.body);
            let productList = Joi.object({
                pageNumber: Joi.number().empty().required().messages({
                    'string.empty': "PageNumber can't be an empty",
                    'string.required': "PageNumber must be required",
                }),
                length: Joi.number().empty().required().messages({
                    'string.empty': "Length can't be an empty",
                    'string.required': "Length must be required",
                }),
                search: Joi.string().allow(null, ""),
            });

            const { error, value } = productList.validate(req.body, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    module.productDelete = function name(req, res, next) {
        try {
            console.log(">>>>", req.query);
            let productDelete = Joi.object({
                id: Joi.string().empty().required().messages({
                    'string.empty': "Id can't be an empty",
                    'string.required': "Id must be required",
                }),
            });
            const { error, value } = productDelete.validate(req.query, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    module.productUpdate = function name(req, res, next) {
        try {
            console.log(">>>>", req.body);
            let productUpdate = Joi.object({
                id: Joi.string().empty().required().messages({
                    'string.empty': "Id can't be an empty",
                    'string.required': "Id must be required",
                }),
                name : Joi.string().allow(null, ""),
                price :Joi.string().allow(null, ""),
                category :Joi.string().allow(null, ""),
                status :Joi.string().allow(null, ""),
            });
            const { error, value } = productUpdate.validate(req.body, {
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
            console.log("userList validation error", error);
            return res.send({
                status: "fail",
                result: {},
                message: "Something went wrong"
            });
        }
    }

    return module;
}
