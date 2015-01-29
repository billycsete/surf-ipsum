'use strict';

var Firebase = require('Firebase');

var proto;

var Suploader = function(uploaderElement) {
	// Suploader
	this.$uploaderElement = uploaderElement;
	this.$formElement = uploaderElement.find('form');
	this.$inputElement = uploaderElement.find('input');
	this.$submitButton = uploaderElement.find('button');

	this.firebaseWords = new Firebase('https://surf-ipsum.firebaseio.com/surf-strings');

	this.firebaseWords.on('value', function(dataSnapshot) {
		dataSnapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log(childData);
		});
	});

	this.init();
};

proto = Suploader.prototype;



proto.init = function() {
	this.$inputElement.focus();
	this._attachEvents();
};



proto._attachEvents = function() {
	this.$inputElement.on('focus', this._onFocus.bind(this));
	this.$inputElement.on('blur', this._onBlur.bind(this));
	this.$inputElement.on('input', this._onValueChange.bind(this));
	this.$submitButton.on('click', this._onSubmit.bind(this));
};



proto._onFocus = function( evt ) {
	this.$uploaderElement.addClass('input-focused');
	console.log('focused on input');
};



proto._onBlur = function( evt ) {
	this.$uploaderElement.removeClass('input-focused');
	console.log('focus left the input');
};



proto._onValueChange = function( evt ) {
	var inputValue = this.$inputElement.val();

	if (inputValue === '') {
		this.$uploaderElement.removeClass('input-has-value');
		console.log('input is empty');
	} else {
		this.$uploaderElement.addClass('input-has-value');
		console.log('value changed to: ' + inputValue);
	}
};



proto._onSubmit = function ( evt ) {
	evt.preventDefault();
	console.log('submitted form');

	console.log(this);

	var inputValue = this.$inputElement.val();
	this.firebaseWords.push(inputValue);
};



proto._pushToFirebase = function() {

};



proto._validateString = function() {

};



proto._doesStringExist = function() {

};



module.exports = Suploader;

