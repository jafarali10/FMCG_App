var jwt = require('jsonwebtoken');
module.exports = function (model) {
    var module = {};


    module.isLogin = async function (req, res, next) {
        let { authorization } = req.headers
        
        if (authorization) {
            let token = authorization.split(" ")[1]
            let adminData = await model.User.findOne({
                jwtLoginToken: token,
                role:"user"
            })

            if (!adminData) {
                return res.send({
                    status: "fail",
                    result: null,
                    message: "Invalid Token",
                    statusCode: 401,
                });
            }
            jwt.verify(token, config.jwt_secret, async function (error, decode) {
                if (!error) {
                    console.log("error");
                    next()
                } else {
                    return res.send({
                        status: "fail",
                        result: null,
                        message: "Please Login, token is expires",
                        statusCode: 401,
                    });
                }
            })

        } else {
            return res.send({
                status: "fail",
                result: null,
                message: "Token not found",
                statusCode: 401,
            });
        }

    };

    return module;
}