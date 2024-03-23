let bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
module.exports = function (model) {
    var module = {};

    module.userLogin = async function (request, response) {
        try {

            let { email, password } = request.body

            let userData = await model.User.findOne({
                email: email,
                isDelete: false,
            })

            if (!userData) {
                return response.send({
                    status: "fail",
                    result: {},
                    message: "Email invalid"
                });
            }

            if (userData.status == "Inactive") {
                return response.send({
                    status: "fail",
                    result: {},
                    message: "Block from admin side, Please contact to admin."
                });
            }

            if (!bcrypt.compareSync(password, userData.password)) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Invalid credentials!",
                    statusCode: 401,
                });
            }


            var token = jwt.sign({ data: userData._id }, config.jwt_secret, { expiresIn: config.jwt_expire });

            userData.jwtLoginToken = token
            await model.User.updateOne({ _id: userData._id }, {
                jwtLoginToken: token
            })

            return response.send({
                status: "success",
                result: userData,
                message: "Login Successfully",
                statusCode: 200,
            });

        } catch (error) {
            console.log("error", error);
            return response.send({
                status: "fail",
                result: null,
                message: "Something went wrong",
                statusCode: 401,
            });
        }
    }

    module.userRegister = async function (request, response) {
        try {

            let { username, email, password } = request.body

            let getUser = await model.User.findOne({
                email: email,
                isDelete: false
            })
            console.log("findOne", getUser);
            if (getUser) {
                console.log("aaa");
                return response.send({
                    status: "fail",
                    result: {},
                    message: "Email already register",
                    statusCode: 401
                });
            }

            let userData = await model.User.create({
                username: username,
                email: email,
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
            })

            var token = jwt.sign({ data: userData._id }, config.jwt_secret, { expiresIn: config.jwt_expire });

            userData.jwtLoginToken = token
            await model.User.updateOne({ _id: userData._id }, {
                jwtLoginToken: token
            })

            return response.send({
                status: "success",
                result: userData,
                message: "Register Successfully",
                statusCode: 200,
            });

        } catch (error) {
            console.log("error", error);
            return response.send({
                status: "fail",
                result: null,
                message: "Something went wrong",
                statusCode: 4001,
            });
        }
    }

    return module;
}