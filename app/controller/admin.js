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

    module.productCreate = async function (request, response) {
        try {
            let { name, price, category } = request.body
            let product = await model.Product.findOne({ name: name, category: category ,isDelete: false});
            if (product) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Already exist this product.",
                    statusCode: 401,
                });
            };
            let createProduct = await model.Product.create({
                name: name,
                price: price,
                category: category
            });
            if (createProduct) {
                return response.send({
                    status: "success",
                    result: null,
                    message: "Successfully Created Product.",
                    statusCode: 200,
                });
            } else {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Product not created, please try after sometime.",
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

    module.productList = async function (request, response) {
        try {

            console.log("----->", request.body);

            let { pageNumber, length, search } = request.body

            let query = {
                isDelete: false,
            }

            if (search) {
                query["$or"] = [
                    { name: { $regex: ".*" + search + ".*", $options: "i" } },
                    { category: { $regex: ".*" + search + ".*", $options: "i" } },
                    { price: { $regex: ".*" + search + ".*", $options: "i" } },
                ]
            }

            let start = pageNumber * length
            start = start - length

            let productlist = await model.Product.find(query).skip(Number(start))
                .limit(Number(length))
                .sort({ createdAt: -1 })
                .lean();

            return response.send({
                status: "success",
                result: productlist,
                message: "Product List",
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

    module.productDelete = async function (request, response) {
        try {
            let product = await model.Product.findOne({ _id: request.query.id });
            if (!product) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Product not found.",
                    statusCode: 401,
                });
            };

            let updateProduct = await model.Product.updateOne({ _id: request.query.id }, { isDelete: true });
            if (updateProduct) {
                return response.send({
                    status: "success",
                    result: null,
                    message: "Successfully Product Delete.",
                    statusCode: 200,
                });
            } else {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Product not update, please try after sometime.",
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

    module.productUpdate = async function (request, response) {
        try {
            let { id, name, price, category, status } = request.body
            let product = await model.Product.findOne({ _id: id, isDelete: false });
            if (!product) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Product not found.",
                    statusCode: 401,
                });
            };
            let checkProduct = await model.Product.findOne({
                _id: { $ne: product._id },
                name: name,
                category: category,
                isDelete: false
            });

            if (checkProduct) {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Already exist this product.",
                    statusCode: 401,
                });
            };

            let updateProduct = await model.Product.updateOne({ _id: id }, {
                name: name,
                price: price,
                category: category,
                status: status
            });
            if (updateProduct) {
                return response.send({
                    status: "success",
                    result: null,
                    message: "Successfully Update Product Details.",
                    statusCode: 200,
                });
            } else {
                return response.send({
                    status: "fail",
                    result: null,
                    message: "Product not update, please try after sometime.",
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