'use strict';

var $             = require('../../../lib/jquery/jquery');
var SelectElement = require('./SelectElement');

var proto;



var IpsumInput = function( wrapperElement ) {
	this.$inputWrapper = wrapperElement;

	this.classNames = {
		inputElement : 'ipsum-input-element',
		submitButton : 'ipsum-generate'
	};

	this._buildIpusmInput();
	this._attachEvents();
};

proto = IpsumInput.prototype;



proto._buildIpusmInput = function( ) {
	// append text span
	this._appendSpan('Shred me');
	// append input element
	this.$inputElement = $('<input class="' + this.classNames.inputElement + '" type="text" name="number" value="2" max="9999">');
	this.$inputWrapper.append( this.$inputElement );
	// append text span
	this._appendSpan('gnarley');
	// append select element
	this.selectElement = new SelectElement();
	this.$inputWrapper.append( this.selectElement.getElement() );
	// append submit button
	this.$generateButton = $('<button class="' + this.classNames.submitButton + '" type="submit"><i class="input-shaka"></i></button>');
	this.$inputWrapper.append( this.$generateButton );
}



proto._attachEvents = function( ) {
	this.$generateButton.on('click', this._fireSubmitEvent.bind(this));
};



proto._fireSubmitEvent = function( ) {
	$(document).trigger({
		type : 'generateIpsum',
		obj : this
	});
}



proto._appendSpan = function( text ) {
	// create a new span element with text inside
	var span = $('<span>' + text + '</span>');
	// append the span element to the list item
	this.$inputWrapper.append(span);
};



proto.getInputValue = function( ) {
	return this.$inputElement.val();
};



proto.getSelectValue = function( ) {
	return this.selectElement.getValue();
};



module.exports = IpsumInput;
