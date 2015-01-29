'use strict'

// Require statements
var $         = require('../../../lib/jquery/jquery');
var Suploader = require('./Suploader');

var Main = {

	initialize : function() {
		// Elements
		this.$uploaderElement = $('#uploader-element');

		// Make new uploader
		var loader = new Suploader(this.$uploaderElement);

	}

};

Main.initialize();
