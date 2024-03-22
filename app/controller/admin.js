module.exports = function (model) {
    var module = {};

    module.adminLogin = async function (request, response) {
        try {
            let { email, password } = request.body

            let adminData = await model.User.findOne({
                email: email,
                role: "admin"
            })

            if (!adminData) {
                let adminCount = await model.User.find({ role: "admin" })
                if (!adminCount.length) {
                    await model.User.create({
                        email: "admin@gmail.com",
                        password: bcrypt.hashSync('123456', bcrypt.genSaltSync(8), null),
                        role: "admin"
                    })
                }
                return response.send({
                    status: "fail",
                    result: {},
                    message: "Email invalid",
                    statusCode: 401,
                });
            }

            if (!bcrypt.compareSync(password, adminData.password)) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Invalid credentials!",
                    statusCode: 401,
                });
            }
            var token = jwt.sign({ data: adminData._id }, config.jwt_secret, { expiresIn: config.jwt_expire });

            adminData.jwtLoginToken = token
            await model.User.updateOne({ _id: adminData._id }, {
                jwtLoginToken: token
            })

            return response.send({
                status: "success",
                result: adminData,
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

    module.getUserList = async function (request, response) {
        try {

            console.log("??", request.body);

            let { pageNumber, length, search } = request.body

            let query = {
                isDelete: false,
                role: 'user'
            }

            if (search) {
                query["$or"] = [
                    { username: { $regex: ".*" + search + ".*", $options: "i" } },
                    { email: { $regex: ".*" + search + ".*", $options: "i" } },
                ]
            }

            let start = pageNumber * length
            start = start - length

            let userlist = await model.User.find(query).skip(Number(start))
                .limit(Number(length))
                .sort({ createdAt: -1 })
                .lean();

            return response.send({
                status: "success",
                result: userlist,
                message: "User List",
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

    module.deleteUser = async function (request, response) {
        try {
            let user = await model.User.findOne({ _id: request.query.id });
            if (!user) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "User not found.",
                    statusCode: 401,
                });
            };

            let userUpdate = await model.User.updateOne({ _id: request.query.id }, { isDelete: true });
            if (userUpdate) {
                return response.send({
                    status: "success",
                    result: null,
                    message: "Successfully Delete User.",
                    statusCode: 200,
                });
            } else {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "User not update, please try after sometime.",
                    statusCode: 401,
                });
            }

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

    module.editUser = async function (request, response) {
        try {
            let { id, username, email, status } = request.body
            let user = await model.User.findOne({ _id: id, isDelete: false });
            if (!user) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "User not found.",
                    statusCode: 401,
                });
            };
            let userUpdate = await model.User.updateOne({ _id: id }, {
                username: username,
                email: email,
                status: status,
            });
            if (userUpdate) {
                return response.send({
                    status: "success",
                    result: null,
                    message: "Successfully Update User Details.",
                    statusCode: 200,
                });
            } else {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "User not update, please try after sometime.",
                    statusCode: 401,
                });
            }
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

    return module;
}