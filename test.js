var app = require("./app.js");
var request = require("supertest").agent(app.listen());
var co = require("co");
var users = require("./userRoutes.js").users;

describe("Simple User Http Crud API", function () {
	var a_user = { };

	beforeEach(function (done) {
		a_user = { name: "Marcus", age: 42, height:1.96 };
		removeAll(done);
		done();
	});

	afterEach(function (done) {
		removeAll(done);
		done();
	});

	var removeAll = function (done) {
		co(function * () {
			yield users.remove({});
		}).catch(onerror);
	};

	it("adds new users", function (done) {
		request
			.post("/user")
			.send(a_user)
			.expect("location", /^\/user\/[0-9a-fA-F]{24}$/)
			.expect(200, done);
	});

	it("fails with validation error for users without name", function (done) {
		delete a_user.name;

		request
			.post("/user")
			.send(a_user)
			.expect("name required")
			.expect(400, done);
	});

	it("get existing user by id", function (done) {
		co(function *() {
			var insertedUser = yield users.insert(a_user);

			var url = "/user/" + insertedUser._id;

			request
				.get(url)
				.set("Accept", "application/json")
				.expect("Content-type", /json/)
				.expect(/Marcus/)
				.expect(/1.96/)
				.expect(200, done);
		}).catch(onerror);
	});

	it("updates an existing user", function (done) {
		co(function *() {
			var insertedUser = yield users.insert(a_user);
			var url = "/user/" + insertedUser._id;

			request
				.put(url)
				.send({ name: "Older Marcus", age: 43, height:1.94 })
				.expect("location", url)
				.expect(201, done);
		}).catch(onerror);

	});

	it("deletes an existing user", function (done) {
		co(function *() {
			var insertedUser = yield users.insert(a_user);
			var url = "/user/" + insertedUser._id;

			request
				.del(url)
				.expect(200, done);
		}).catch(onerror);

	});

});

function onerror(err) {
	console.error(err.stack);
};