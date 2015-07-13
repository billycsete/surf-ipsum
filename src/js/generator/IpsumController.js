'use strict';

var $             = require('../../../lib/jquery/jquery');
var SelectElement = require('./SelectElement');
var IpsumOutput   = require('./IpsumOutput');

var proto;



var IpsumController = function( ) {
	// IpsumController elements
	this.$inputElement = $('#ipsum-input');
	this.$outputElement = $('#ipsum-output');
	this.selectElement = new SelectElement();
	this.$inputElement = $('#ipsum-input-element');
	this.$generateButton = $('#ipsum-generate');
	// create reference to our output object
	this.output = new IpsumOutput( this.$outputElement );

	this._init();
};

proto = IpsumController.prototype;



proto._init = function( ) {
	// Add event listeners
	this._attachEvents();
};



proto._attachEvents = function( ) {
	// when the submit button is clicked, generate ipsum
	this.$generateButton.on('click', this._generateIpsum.bind(this) );
};



proto._generateIpsum = function( listItemObject ) {

	this._openResults();


	var inputValue = this.$inputElement.val();
	var selectValue = this.selectElement.getValue();

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
};



proto._openResults = function( ) {
	$(document.body).addClass('show-results');

}



module.exports = IpsumController;

