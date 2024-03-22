module.exports = function (app, model, controller) {
    
    var middleware = require('../app/middleware/index')(model);
    var validation = require('../app/validation/index')(model);
    
    app.post('/admin', validation.admin.adminLogin, controller.admin.adminLogin);
    app.post('/admin/userList',validation.admin.userList, middleware.admin.isLogin, controller.admin.getUserList);
    app.delete('/admin/userDelete',validation.admin.deleteUser, middleware.admin.isLogin, controller.admin.deleteUser);
    app.put('/admin/userEdit',validation.admin.editUser, middleware.admin.isLogin, controller.admin.editUser);

    
    
}