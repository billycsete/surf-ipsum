'use strict';

var FirebaseObject  = require('../shared/FirebaseObject');
var UploaderMessage = require('./UploaderMessage');

var proto;

/**
 * Uploader
 * @constructor
 * @param {element} uploaderElement - reference to the uploader element
 */
var Uploader = function( uploaderElement ) {
	// uploader elements
	this.$uploaderElement = uploaderElement;
	this.$inputElement = uploaderElement.find( 'input' );
	this.$submitButton = uploaderElement.find( 'button' );
	// error/success message manager
	this.message = new UploaderMessage();
	// access to database of words
	this.firebaseObject = new FirebaseObject();

	this.init();
};

proto = Uploader.prototype;


/**
 * Initialize uploader
 */
proto.init = function() {
	// start with the input element focused
	this.$inputElement.focus();
	// attach events to input/submit elements
	this._attachEvents();
};


/**
 * Attach events
 */
proto._attachEvents = function() {
	this.$inputElement.on( 'focus', this._onFocus.bind(this) );
	this.$inputElement.on( 'blur', this._onBlur.bind(this) );
	this.$inputElement.on( 'input', this._onValueChange.bind(this) );
	this.$submitButton.on( 'click', this._onSubmit.bind(this) );
};


/**
 * Called when the uploader input is focused
 */
proto._onFocus = function( ) {
	this.$uploaderElement.addClass( 'input-focused' );
};


/**
 * Called when the uploader input loses focus
 */
proto._onBlur = function( ) {
	this.$uploaderElement.removeClass( 'input-focused' );
};


/**
 * Called when the input value changes
 */
proto._onValueChange = function( ) {
	var inputValue = this.$inputElement.val();

	// hide the error message if someone starts typing again
	this.message.hideMessage();

	if ( inputValue === '' ) {
		this.$uploaderElement.removeClass( 'input-has-value' );
		this.$submitButton.attr( 'tabindex', -1 );
	} else {
		this.$uploaderElement.addClass( 'input-has-value' );
		this.$submitButton.attr( 'tabindex', 0 );
	}
};


/**
 * Called when the submit button is clicked
 */
proto._onSubmit = function( evt ) {
	// stop submit event
	evt.preventDefault();
	// store input value
	var inputValue = this.$inputElement.val();
	// return if its not a valid input
	if( !this._isValidInput( inputValue ) ) {
		return;
	}
	// push the value from the input to firebase
	this.firebaseObject.addString( inputValue );
	this._onSuccess( inputValue );
};


/**
 * Called when a word was successfully uploaded to firebase
 * @param {string} inputValue - string that was uploaded to firebase
 */
proto._onSuccess = function( inputValue ) {
	this.message.showSucessMessage( '<i class="icon-ok"></i><span>Uploaded</span><span class="green">' + inputValue + '</span>' );
	// reset input
	this.$inputElement.val( '' );
	this.$uploaderElement.removeClass( 'input-has-value' );
};


/**
 * Check to see if an input is a valid entry
 * @param {string} inputValue - string to validate
 * @return {boolean}
 */
proto._isValidInput = function( inputValue ) {
	// check for duplicate value
	if ( this.firebaseObject.isDuplicate( inputValue ) ) {
		this.message.showErrorMessage( '<i class="icon-cancel"></i><span>Duplicate entry.</span>' );
		return false;
	}
	// check for empty input
	if ( inputValue === '' ) {
		this.message.showErrorMessage( '<i class="icon-cancel"></i><span>Yah kook, the input is empty!</span>' );
		return false;
	}

	// return true if the input is a valid string entry
	return true;
};


module.exports = Uploader;

