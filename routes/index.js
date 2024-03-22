module.exports = function (app, model, controllers) {

	require('./user.js')(app, model, controllers);
	require('./admin.js')(app, model, controllers);

}