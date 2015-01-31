'use strict';

var $           = require('../../../lib/jquery/jquery');
var IpsumList   = require('./IpsumList');
var IpsumOutput = require('./IpsumOutput');

var proto;



var IpsumController = function( ) {
	// IpsumController elements
	this.$listElement = $('#ipsum-list');
	this.$outputElement = $('#output');
	this.$submitButton = $('#ipsum-submit');
	// create list of inputs
	this.list = new IpsumList(this.$listElement);
	// create reference to our output object
	this.output = new IpsumOutput(this.$outputElement);

	this.init();
};

proto = IpsumController.prototype;



proto.init = function( ) {
	this._attachEvents();
};



proto._attachEvents = function( ) {
	this.$submitButton.on('click', this._onSubmit.bind(this));
};



proto._onSubmit = function( ) {
	this.output.printHeadlines(1);
	this.output.printParagraphs(2);
	this.output.printLists(2);
	this.output.printHeadlines(2);
	this.output.printWords(400);
};



module.exports = IpsumController;

