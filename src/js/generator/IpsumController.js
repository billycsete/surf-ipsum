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
	// this.output = new IpsumOutput(this.$outputElement);
	this.output = {};

	this._init();
};

proto = IpsumController.prototype;



proto._init = function( ) {
	this._attachEvents();
};



proto._attachEvents = function( ) {
	// when the submit button is clicked, generate ipsum
	this.$submitButton.on('click', this._onSubmit.bind(this));
};



proto._onSubmit = function( ) {
	var listItemObjects = this.list.getIpsumItems();

	listItemObjects.forEach(this._generateIpsum.bind(this));

	// TEST
	this.output.printHeadlines(1);
	this.output.printParagraphs(2);
	this.output.printLists(2);
	this.output.printHeadlines(2);
	this.output.printWords(400);
};



proto._generateIpsum = function( listItemObject ) {
	var inputValue = listItemObject.getInputValue();
	var selectValue = listItemObject.getSelectValue();

	console.log(inputValue, selectValue);
}



module.exports = IpsumController;

