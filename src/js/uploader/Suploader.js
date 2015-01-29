
'use strict';

var proto;

var Suploader = function(formElement) {
	this.$form = formElement;
	this.$input = this.$form.find('input');

	this.init();
};

proto = Suploader.prototype;



proto.init = function() {
	console.log('New SUPLOADER!');
};



proto._attachEvents = function() {
	// on focus, add class
	// on value upate, check max length
	// on submit button click
		// validate characters / length / duplicate
		// push to firebase
};



proto._pushToFirebase = function() {
	
};



proto._validateString = function() {
	
};



proto._doesStringExist = function() {
	
};



module.exports = Suploader;

