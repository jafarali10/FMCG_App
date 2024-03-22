module.exports = function (model) {
	var module = {};

	module.admin = require('./admin')(model);
	module.user = require('./user')(model);
    
	return module;
}