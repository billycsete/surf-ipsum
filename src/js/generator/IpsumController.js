'use strict';

var $           = require('../../../lib/jquery/jquery');
var IpsumOutput = require('./IpsumOutput');

var proto;



var IpsumController = function() {
	// IpsumController elements
	this.$submitButton = $('#ipsum-submit');
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
	// output.printParagrahs(2);
	// output.printWords(100);


	// var output = $('#output');
	// var paragraph = '';


	// // for (var i = 0; i < strings.length; i++) {
	// // 	paragraph += '' + strings[i] + ' ';
	// // };


	// $(strings).each(printToOutput);



	// function printToOutput( i, string ) {
	// 	paragraph += ('' + string + ' ');
	// }

	// console.log(paragraph);

	// output.html('<p>' + paragraph + '</p>');
	this.output.printHeadlines(1);
	this.output.printParagraphs(2);
	this.output.printHeadlines(1);
	this.output.printWords(400);
};



module.exports = IpsumController;

