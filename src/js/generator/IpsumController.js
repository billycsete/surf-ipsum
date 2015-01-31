'use strict';

var $              = require('../../../lib/jquery/jquery');
var FirebaseObject = require('../shared/FirebaseObject');
var IpsumOutput    = require('./IpsumOutput');

var proto;



var IpsumController = function() {
	// IpsumController elements
	this.$submitButton = $('#ipsum-submit');
	// access to database of words
	this.firebaseObject = new FirebaseObject();
	// create reference to our output object
	this.output = new IpsumOutput();

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
	var strings = this.firebaseObject.getRandomStrings(10);

	var output = $('#output');
	var paragraph = '';


	// for (var i = 0; i < strings.length; i++) {
	// 	paragraph += '' + strings[i] + ' ';
	// };


	$(strings).each(printToOutput);



	function printToOutput( i, string ) {
		paragraph += ('' + string + ' ');
	}

	console.log(paragraph);

	output.html('<p>' + paragraph + '</p>');
};



module.exports = IpsumController;

