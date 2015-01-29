'use strict'

// Require statements
// var Firebase = require('../../../lib/firebase/firebase.js');
var $         = require('../../../lib/jquery/jquery.js');
var Suploader = require('./Suploader');

var Main = {

	initialize : function() {
		// Initialize modules for page behavior here
		this.$form = $('#upload-form');

		var loader = new Suploader(this.$form);

	}

};

Main.initialize();
