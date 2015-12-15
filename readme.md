### UserApi


#### Intro

This code is based on the 'Building an HTTP API With Koa', module 4 of the ['Introduction to Koa Javascript'] Pluralsight course. It's a simple CRUD API that exposes the basics of writing a Koa web service.

#### Notes

* In order to use the --harmony-generators option (in tests), had to revert to node 0.12.9
	* node 5.1.1 works fine with --harmony option
* Had to (slightly) rework specs to accommodate changes from co v3 to co v4

['Introduction to Koa Javascript']: https://app.pluralsight.com/library/courses/javascript-koa-introduction/table-of-contents