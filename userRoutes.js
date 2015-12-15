var parse = require('co-body');
var monk = require("monk");
var wrap = require("co-monk");
var db = monk("localhost/apiUsers");
var users = wrap(db.get("users"));
module.exports.users  = users;

module.exports.addUser = function *addUser() {
	var userFromRequest = yield parse(this);
	
	if (!userFromRequest.name) {
		this.throw(400, 'name required');
	}
	var insertedUser = yield users.insert(userFromRequest);
	
	this.set('location', '/user/' + insertedUser._id);;
	this.status = 200;
};

module.exports.getUser = function *getUser(id) {
	var user = yield users.findById(id);
	console.log(user);
	
	this.body = user;
	this.status = 200;
};

module.exports.updateUser = function *updateUser(id) {
	var userFromRequest = yield parse(this);
	
	yield users.updateById(id, userFromRequest);
	
	this.set('Location', '/user/'+ id);
	this.body = userFromRequest;
	this.status = 201;
};

module.exports.deleteUser = function *deleteUser(id) {
	yield users.remove( { _id: id } );
	
	this.body = 'user with id \'' + id + '\' has been purged';
	this.status = 200;	
};

module.exports.deleteUsers  = function *deleteUsers() {
	yield users.remove();
	
	this.body = 'all users have been purged';
	this.status = 200;
};

module.exports.getUsers = function *getUsers() {
	var all = yield users.find({});
	
	this.body =all;
	this.status = 200;
}