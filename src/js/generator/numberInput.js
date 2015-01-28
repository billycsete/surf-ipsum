
'use strict';

var proto;

var InputConfigurator = function(element) {
	this.formElement = document.getElementById(element);
	this.inputElement = this.formElement.querySelector('.input');
	this.submitButton = this.formElement.querySelector('.submit');
	this.inputValue = this._getInputValue();

	// custom event to pass along the input value information
	this.submitEvent = new CustomEvent('build-' + element, {
		detail: { value: this.inputValue }
	});

	this.init();
};

proto = InputConfigurator.prototype;



proto.init = function() {
	// update the input value when the input changes
	this.inputElement.addEventListener('input', function () {
		this._updateInputValue()
		console.log(this.inputValue);
	}.bind(this));
	// submit event that will generate the surf ipsum
	this.submitButton.addEventListener('click', function (evt) {
		this.submitForm(evt);
	}.bind(this));
};



proto.submitForm = function (evt) {
	// stop default submit event
	evt.preventDefault();
	// fire custom event that will trigger the generation of surf ipsum
	document.dispatchEvent(this.submitEvent);
};



proto._getInputValue = function() {
	return this.inputElement.value;
};



proto._updateInputValue = function() {
	this.inputValue = this._getInputValue();
	this.submitEvent.detail.value = this._getInputValue();
};



module.exports = InputConfigurator;
