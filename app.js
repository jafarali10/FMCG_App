let express = require('express');
require('dotenv').config()
let fs = require('fs');
let path = require("path");
let bodyParser = require("body-parser");
let fileUpload = require("express-fileupload");
let mongoose = require('mongoose');

let swaggerUi = require("swagger-ui-express")
let swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = require('./swagger.json');
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');

const { SERVER_PORT } = process.env;
let app = express();
let server = require("http").createServer(app);
app.use(fileUpload());
app.set("port", SERVER_PORT);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

global.config = require("./config/constants.js");

app.use(express.static(path.join(__dirname, "public")));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

var model = require("./app/model/index")(mongoose);
var controller = require("./app/controller/index")(model);
require("./routes/index")(app, model, controller);

let swagggerOption = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "FMCG APIs Collection",
            version: '1.0.0'
        },
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        },
        servers: [
            {
                url: config.baseUrl,
            }
        ]
    },
    // apis : ['./app/controllers/admin/auth.js']
    apis: ['./app.js']
}

const swaggerSpec = swaggerJSDoc(swagggerOption);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, customCss))


let dbConnect = require("./config/database.js")(mongoose);
dbConnect.then(async (response) => {
    console.log("DB response -->", response);
}).catch((err) => {
    console.log("Database connection error: ", err);
});

server.listen(SERVER_PORT, function () {
    console.log("(---------------------------------)");
    console.log("|         Server Started...       |");
    console.log("|    " + config.baseUrl + "   |");
    console.log("(---------------------------------)");
});