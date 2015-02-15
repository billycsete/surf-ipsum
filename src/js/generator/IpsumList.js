'use strict';

var $               = require('../../../lib/jquery/jquery');
var IpsumItem       = require('./IpsumItem');

var proto;



var IpsumList = function( listElement ) {
	// IpsumList elements
	this.$list = listElement;
	this.$addItemButton = $('#ipsum-item-add');
	this.maxItems = 100;

	this.ipsumItems = [ ];

	this._init();
};

proto = IpsumList.prototype;



proto._init = function( ) {
	// add the initial list item
	this.addListItem();
	// attach event listeners
	this._attachEvents();
};



proto._attachEvents = function( ) {
	// add a new list item when the plus button is clicked
	this.$addItemButton.on( 'click', this.addListItem.bind(this) );
	// remove list items when close button is clicked
	$(document).on( 'removeItem', this._removeListItem.bind(this) );
};



proto._removeListItem = function( evt ) {
	var itemObject = evt.obj;
	var itemIndex = $.inArray( itemObject, this.ipsumItems );

	// if the itemObject exists in our array, lets remove it
	if( itemIndex >= 0 ) {
		// remove the html element
		itemObject.$itemElement.remove();
		// remove the ipsumItem from our array
		this.ipsumItems.splice( itemIndex, 1 );
	}
};



proto.addListItem = function( ) {
	// Stop creating list items after maximum is reached
	// TODO: show error message when it is reached
	if ( this.ipsumItems.length >= this.maxLength ) {
		return;
	}

	// create a new item object
	var ipsumItem = new IpsumItem();
	// add the new item object to the array of list items
	this.ipsumItems.push(ipsumItem);
	// get the list item element
	var listItem = ipsumItem.getElement();
	listItem.css( 'z-index', this.maxItems - this.ipsumItems.length );
	// append the new list item to the list
	this.$list.append( listItem );
};



proto.getIpsumItems = function( ) {
	return this.ipsumItems;
};



module.exports = IpsumList;

