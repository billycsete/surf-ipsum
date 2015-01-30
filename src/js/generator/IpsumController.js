'use strict';

var $              = require('../../../lib/jquery/jquery');
var FirebaseObject = require('../shared/FirebaseObject');

var proto;



var IpsumController = function() {
	// IpsumController elements
	this.$submitButton = $('#ipsum-submit');
	this.$numberInput;
	// access to database of words
	this.firebaseObject = new FirebaseObject();

	this.init();
};

proto = IpsumController.prototype;



proto.init = function() {
	this._attachEvents();
};



proto._attachEvents = function() {
	this.$submitButton.on('click', this._onSubmit.bind(this));
};



proto._onSubmit = function() {
	this.firebaseObject.getRandomStrings(4);
};



module.exports = IpsumController;

