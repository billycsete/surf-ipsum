'use strict';

var $               = require('../../../lib/jquery/jquery');

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
	this.$removeButton = this.$itemElement.append( this._makeRemoveButton() );
	this._appendSpan('Shred me');
	this.$inputElement = this.$itemElement.append( this._makeInputElement() );
	this._appendSpan('gnarley');
	this.$selectElement = this.$itemElement.append( this._makeSelectElement() );
};



proto.getElement = function( ) {
	return this.$itemElement;
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
	// create new select element
	return $('<select class="item-select"><option value="paragraph" selected>paragraphs</option><option value="titles">titles</option><option value="lists">lists</option><option value="words">words</option></select>');
};



proto._appendSpan = function( text ) {
	// create a new span element with text inside
	var span = $('<span>' + text + '</span>');
	// append the span element to the list item
	this.$itemElement.append(span);
}



module.exports = IpsumItem;
