'use strict';

var $               = require('../../../lib/jquery/jquery');
var IpsumItem       = require('./IpsumItem');

var proto;



var IpsumList = function( listElement ) {
	// IpsumList elements
	this.$list = listElement;
	this.$addItemButton = $('#ipsum-add-item');

	this.listItems = [];

	this.init();
};

proto = IpsumList.prototype;



proto.init = function( ) {
	this.addListItem();
	this._attachEvents();
};



proto._attachEvents = function( ) {
	this.$addItemButton.on('click', this.addListItem.bind(this));
};



proto.addListItem = function( ) {
	// create a new item object
	var ipsumItem = new IpsumItem();
	// add the new item object to the array of list items
	this.listItems.push(listItem);
	// get the list item element
	var listItem = ipsumItem.getElement();

	this.$list.append(listItem);
};



module.exports = IpsumList;

