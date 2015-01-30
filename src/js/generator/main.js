'use strict'

// Require statements
var IpsumController = require('./IpsumController');

var Main = {

	initialize : function() {

		var controller = new IpsumController();

		return this;
	}

};

Main.initialize();
