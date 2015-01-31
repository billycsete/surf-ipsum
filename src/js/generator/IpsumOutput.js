'use strict';

var $               = require('../../../lib/jquery/jquery');

var proto;



var IpsumOutput = function() {
	// IpsumOutput elements
	this.$outputElement = $('#output');

	this.init();
};

proto = IpsumOutput.prototype;



proto.init = function() {
	console.log('new ipsum list');
};



proto.addListItem = function() {

};



module.exports = IpsumOutput;

