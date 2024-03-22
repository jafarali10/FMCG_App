module.exports = function (app, model, controller) {

    var middleware = require('../app/middleware/index')(model);
    var validation = require('../app/validation/index')(model);

    app.post('/userRegister',validation.user.userRegister, controller.user.userRegister);
    app.post('/userLogin',validation.user.userLogin, controller.user.userLogin);
    
}