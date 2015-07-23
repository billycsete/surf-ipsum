'use strict';

var $             = require('../../../lib/jquery/jquery');
var SelectElement = require('./SelectElement');
var IpsumOutput   = require('./IpsumOutput');

require('../../../lib/gsap/TweenMax.js');

var proto;



var IpsumController = function( ) {
	// IpsumController elements
	this.$inputElement = $('#input-number');
	this.selectElement = new SelectElement();
	this.$generateButton = $('#input-generate');
	// create reference to our output object
	this.$outputElement = $('#ipsum-output');
	this.$outputResults = $('#ipsum-output-results');
	this.output = new IpsumOutput( this.$outputResults );
	this.$closeOutputButton = $('#output-close');

	this._init();
};

proto = IpsumController.prototype;



proto._init = function( ) {
	// Add event listeners
	this._attachEvents();
};



proto._attachEvents = function( ) {
	// when the submit button is clicked, generate ipsum
	this.$generateButton.on( 'click', this._openResults.bind(this) );

	this.$closeOutputButton.on( 'click', this._closeResults.bind(this) );
};



proto._openResults = function( ) {
	$(document.body).addClass('show-results');

	TweenMax.to( this.$outputElement, 1, {
		top: '0',
		ease: Quart.easeInOut,
		onComplete : this._generateIpsum.bind(this)
	});

}


proto._closeResults = function( ) {
	$(document.body).removeClass('show-results');

	TweenMax.to( this.$outputElement, 1, {
		top: '100%',
		ease: Quart.easeInOut,
		onComplete : this._clearIpsum.bind(this)
	});

}



proto._clearIpsum = function( ) {
	this.$outputResults.html('');
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

