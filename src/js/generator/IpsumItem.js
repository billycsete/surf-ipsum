'use strict';

var $             = require('../../../lib/jquery/jquery');
var SelectElement = require('../shared/SelectElement');
var proto;



var IpsumItem = function( ) {
	// IpsumItem elements
	this.$itemElement = $('<li></li>');
	this.$removeButton;
	this.$inputElement;
	this.$selectElement;

	this.init();
};

proto = IpsumItem.prototype;



proto.init = function( ) {
	// Append remove button
	this.$removeButton = this._makeRemoveButton();
	this.$itemElement.append( this.$removeButton );
	// append text span
	this._appendSpan('Shred me');
	// append input element
	this.$inputElement = this._makeInputElement();
	this.$itemElement.append( this.$inputElement );
	// append text span
	this._appendSpan('gnarley');
	// append select element
	this.$selectElement = this._makeSelectElement();
	this.$itemElement.append( this.$selectElement );
	// attach event listeners
	this._attachEvents();
};



proto.getElement = function( ) {
	return this.$itemElement;
};



proto.getInputValue = function( ) {
	return this.$inputElement.val();
};



proto.getSelectValue = function( ) {
	return this.$selectElement.val();
};



proto._attachEvents = function( ) {
	this.$removeButton.on('click', this._fireRemoveEvent.bind(this));
};



proto._makeRemoveButton = function( ) {
	// create new close button
	return $('<button class="item-remove"><i class="icon-minus-circled"></i></button>');
};



proto._makeInputElement = function( ) {
	// create new input element
	return $('<input class="item-number" type="text" name="number" placeholder="2">');
};



proto._makeSelectElement = function( ) {
	var select = new SelectElement();
	console.log(select);
	// create new select element
	return $('<select class="item-select"><option value="paragraph" selected>paragraphs</option><option value="titles">titles</option><option value="lists">lists</option><option value="words">words</option></select>');
};



proto._appendSpan = function( text ) {
	// create a new span element with text inside
	var span = $('<span>' + text + '</span>');
	// append the span element to the list item
	this.$itemElement.append(span);
};



proto._fireRemoveEvent = function( ) {
	$(document).trigger({
		type : 'removeItem',
		obj : this
	});
};


module.exports = IpsumItem;
