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
	this.list = new IpsumList( this.$listElement );
	// create reference to our output object
	this.output = new IpsumOutput( this.$outputElement );

	this._init();
};

proto = IpsumController.prototype;



proto._init = function( ) {
	this._attachEvents();
};



proto._attachEvents = function( ) {
	// when the submit button is clicked, generate ipsum
	this.$submitButton.on( 'click', this._onSubmit.bind(this) );
};



proto._onSubmit = function( ) {
	var listItemObjects = this.list.getIpsumItems();

	listItemObjects.forEach( function( item ) {
		this._generateIpsum( item );
	}.bind(this));
};



proto._generateIpsum = function( listItemObject ) {
	var selectValue = listItemObject.getSelectValue();
	var inputValue = listItemObject.getInputValue();


	switch ( selectValue ) {

		case 'paragraphs':
			this.output.printParagraphs( inputValue );
			break;

		case 'headlines':
			this.output.printHeadlines( inputValue );
			break;

		case 'lists':
			this.output.printLists( inputValue );
			break;

		case 'words':
			this.output.printWords( inputValue );
			break;

	}

	console.log('val: ', selectValue, inputValue);
}



module.exports = IpsumController;

