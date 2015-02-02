'use strict';

var $               = require('../../../lib/jquery/jquery');
var IpsumItem       = require('./IpsumItem');

var proto;



var IpsumList = function( listElement ) {
	// IpsumList elements
	this.$list = listElement;
	this.$addItemButton = $('#ipsum-add-item');

	this.ipsumItems = [];

	this.init();
};

proto = IpsumList.prototype;



proto.init = function( ) {
	// add the initial list item
	this.addListItem();
	// attach event listeners
	this._attachEvents();
};



proto.addListItem = function( ) {
	// create a new item object
	var ipsumItem = new IpsumItem();
	// add the new item object to the array of list items
	this.ipsumItems.push(ipsumItem);
	// get the list item element
	var listItem = ipsumItem.getElement();
	// append the new list item to the list
	this.$list.append(listItem);
};



proto.getIpsumItems = function( ) {
	return this.ipsumItems;
};



proto._attachEvents = function( ) {
	// add a new list item when the plus button is clicked
	this.$addItemButton.on('click', this.addListItem.bind(this));
	// remove list items when close button is clicked
	$(document).on('removeItem', this._removeListItem.bind(this));
};



proto._removeListItem = function( evt ) {
	var itemObject = evt.obj;
	var itemIndex = $.inArray(itemObject, this.ipsumItems);

	// if the itemObject exists in our array, lets remove it
	if( itemIndex >= 0 ) {
		// remove the html element
		itemObject.$itemElement.remove();
		// remove the ipsumItem from our array
		this.ipsumItems.splice(itemIndex, 1);
	}
};



module.exports = IpsumList;

