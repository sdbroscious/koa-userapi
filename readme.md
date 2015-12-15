### UserApi


#### Intro

This code is based 'Building an HTTP API With Koa' module that's part of the 'Introduction to Koa Javascript' Pluralsight course. It's a simple CRUD API that exposes the basics of writing a Koa web service.

#### Notes

* In order to use the --harmony-generators option (in tests), had to revert to node 0.12.9
	* node 5.1.1 works fine with --harmony option
* Had to (slightly) rework specs to accommodate changes from co v3 to co v4