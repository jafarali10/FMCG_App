module.exports = function (app, model, controller) {
    
    var middleware = require('../app/middleware/index')(model);
    var validation = require('../app/validation/index')(model);
    
    app.post('/admin', validation.admin.adminLogin, controller.admin.adminLogin);
    app.post('/admin/userList',validation.admin.userList, middleware.admin.isLogin, controller.admin.getUserList);
    app.delete('/admin/userDelete',validation.admin.deleteUser, middleware.admin.isLogin, controller.admin.deleteUser);
    app.put('/admin/userEdit',validation.admin.editUser, middleware.admin.isLogin, controller.admin.editUser);

    app.post('/admin/productCreate', validation.admin.productCreate, middleware.admin.isLogin, controller.admin.productCreate);
    app.post('/admin/productList', validation.admin.productList, middleware.admin.isLogin, controller.admin.productList);
    app.delete('/admin/productDelete', validation.admin.productDelete, middleware.admin.isLogin, controller.admin.productDelete);
    app.put('/admin/productUpdate', validation.admin.productUpdate, middleware.admin.isLogin, controller.admin.productUpdate);
    
}