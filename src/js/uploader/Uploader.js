'use strict';

var $        = require('../../../lib/jquery/jquery');
var Firebase = require('Firebase');
var UploaderMessage = require('./UploaderMessage');

var proto;

var Uploader = function(uploaderElement) {
	// uploader elements
	this.$uploaderElement = uploaderElement;
	this.$formElement = uploaderElement.find('form');
	this.$inputElement = uploaderElement.find('input');
	this.$submitButton = uploaderElement.find('button');
	// error/success message manager
	this.message = new UploaderMessage();
	// word database
	this.firebase = new Firebase('https://surf-ipsum.firebaseio.com/surf-strings');
	this.wordsArray = [];

	this.init();
};

proto = Uploader.prototype;



proto.init = function() {
	// start with the input element focused
	this.$inputElement.focus();
	// attach events to input element and to firebase
	this._attachEvents();
};



proto._attachEvents = function() {

	this.firebase.on('value', function ( dataSnapshot ) {
		this._onFirebaseUpdate(dataSnapshot);
	}.bind(this));

	this.$inputElement.on('focus', this._onFocus.bind(this));
	this.$inputElement.on('blur', this._onBlur.bind(this));
	this.$inputElement.on('input', this._onValueChange.bind(this));
	this.$submitButton.on('click', this._onSubmit.bind(this));
};



proto._onFirebaseUpdate = function ( dataSnapshot ) {
	var updatedWordsArray = [];

	dataSnapshot.forEach(function(childSnapshot) {
		var childData = childSnapshot.val();
		updatedWordsArray.push(childData);
	});

	this.wordsArray = updatedWordsArray;
};



proto._onFocus = function( evt ) {
	this.$uploaderElement.addClass('input-focused');
};



proto._onBlur = function( evt ) {
	this.$uploaderElement.removeClass('input-focused');
};



proto._onValueChange = function( evt ) {
	var inputValue = this.$inputElement.val();

	// hide the error message is someone starts typing again
	// this.$uploaderElement.removeClass('show-message show-message-success show-message-error');
	this.message.hideMessage();

	if (inputValue === '') {
		this.$uploaderElement.removeClass('input-has-value');
		// console.log('input is empty');
	} else {
		this.$uploaderElement.addClass('input-has-value');
		// console.log('value changed to: ' + inputValue);
	}
};



proto._onSubmit = function ( evt ) {
	// stop submit event
	evt.preventDefault();
	// store input value
	var inputValue = this.$inputElement.val();
	// return if its not a valid input
	if(!this._isValidInput(inputValue)) {
		return;
	}
	// push the value from the input to firebase
	this.firebase.push(inputValue);
	this._onSuccess(inputValue);
};



proto._onSuccess = function ( inputValue ) {
	this.message.showMessage();
	// this.$uploaderElement.addClass('show-message show-message-success');
	// this.$uploaderMessage.append('<i class="icon-thumbs-up"></i> Great success! Uploaded: <strong>' + inputValue + '</strong>').fadeIn();
	// reset input
	this.$inputElement.val('');
	this.$uploaderElement.removeClass('input-has-value');
};



proto._isValidInput = function( inputValue ) {
	if (this._isDuplicate(inputValue)) {
		this.message.showMessage();
		// this.$uploaderElement.addClass('show-message show-message-error');
		// this.$uploaderMessage.append('<i class="icon-thumbs-down"></i> Already exists, bish!').fadeIn();
		console.log('duplicate value');
		return false;
	}

	if (inputValue === '') {
		this.message.showMessage();
		// this.$uploaderElement.addClass('show-message show-message-error');
		// this.$uploaderMessage.append('<i class="icon-thumbs-down"></i> The input is empty, silly!').fadeIn();
		console.log('input is empty, silly');
		return false;
	}

	return true;
};



proto._isDuplicate = function( string ) {
	return $.inArray(string, this.wordsArray) !== -1;
};



module.exports = Uploader;

