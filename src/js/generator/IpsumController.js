'use strict';

var $           = require('../../../lib/jquery/jquery');
var IpsumInput = require('./IpsumInput');
var IpsumOutput = require('./IpsumOutput');

var proto;



var IpsumController = function( ) {
	// IpsumController elements
	this.$inputElement = $('#ipsum-input');
	this.$outputElement = $('#ipsum-output');
	// create input controls
	this.input = new IpsumInput( this.$inputElement );
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
	$(document).on( 'generateIpsum', this._generateIpsum.bind(this) );
};



proto._generateIpsum = function( listItemObject ) {
	var selectValue = this.input.getSelectValue();
	var inputValue = this.input.getInputValue();

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
}



module.exports = IpsumController;

