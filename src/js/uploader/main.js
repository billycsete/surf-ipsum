'use strict';

// // Require statements
var Uploader = require('./Uploader');

var Main = {

	initialize : function() {
		// Elements
		this.$uploaderElement = $('#uploader-element');

		// Make new uploader
		var loader = new Uploader( this.$uploaderElement );

	}

};

Main.initialize();
