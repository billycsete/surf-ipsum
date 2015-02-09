'use strict';

var $             = require('../../../lib/jquery/jquery');
var SelectElement = require('./SelectElement');
var proto;



var IpsumItem = function( ) {
	// TODO: organize class names up top
	this.classNames = {
		itemElement : 'ipsum-item',
		removeButton : 'ipsum-item-remove',
		inputElement : 'ipsum-item-input'
	};

	this._buildItemElement();

	this._attachEvents();
};

proto = IpsumItem.prototype;



proto._buildItemElement = function( ) {
	// Create item element
	this.$itemElement = $('<li class="' + this.classNames.itemElement + '"></li>');
	// Append remove button
	this.$removeButton = $('<button class="' + this.classNames.removeButton + '"><i class="icon-minus-circled"></i></button>');
	this.$itemElement.append( this.$removeButton );
	// append text span
	this._appendSpan('Shred me');
	// append input element
	this.$inputElement = $('<input class="' + this.classNames.inputElement + '" type="text" name="number" placeholder="2">');
	this.$itemElement.append( this.$inputElement );
	// append text span
	this._appendSpan('gnarley');
	// append select element
	this.$selectElement = new SelectElement();
	this.$itemElement.append( this.$selectElement );
}


proto._attachEvents = function( ) {
	this.$removeButton.on('click', this._fireRemoveEvent.bind(this));
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



proto.getElement = function( ) {
	return this.$itemElement;
};



proto.getInputValue = function( ) {
	return this.$inputElement.val();
};



proto.getSelectValue = function( ) {
	return this.$selectElement.val();
};



module.exports = IpsumItem;
