'use strict';

var $             = require('../../../lib/jquery/jquery');
var SelectElement = require('./SelectElement');
var IpsumOutput   = require('./IpsumOutput');

require('../../../lib/gsap/TweenMax.js');

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
	this.$generateButton.on('click', this._openResults.bind(this) );
};



proto._openResults = function( ) {
	this._generateIpsum();

	TweenMax.to( this.$outputElement, 1, {top: '0', ease: Quart.easeInOut } );
	$(document.body).addClass('show-results');
}



proto._generateIpsum = function( ) {

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



module.exports = IpsumController;

