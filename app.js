var koa = require('koa');
var app = module.exports = koa();
var routes = require('koa-route');

// routes
var userRoutes = require("./userRoutes.js");
app.use(routes.post("/user", userRoutes.addUser));
app.use(routes.get("/user/:id", userRoutes.getUser));
app.use(routes.put("/user/:id", userRoutes.updateUser));
app.use(routes.del("/user/:id", userRoutes.deleteUser));
app.use(routes.del('/users', userRoutes.deleteUsers));
app.use(routes.get('/users', userRoutes.getUsers));

app.listen(3000);
console.log("The app is listening on port 3000");