'use strict';

var $               = require('../../../lib/jquery/jquery');

var proto;



var IpsumItem = function() {
	// IpsumItem elements
	this.$numberInput;
	this.$selectInput;

	this.init();
};

proto = IpsumItem.prototype;



proto.init = function() {
	console.log('new ipsum item');
};



proto.generateNewItem = function() {

};



proto._attachEvents = function() {
	// this.$inputElement.on('input', this._onValueChange.bind(this));
};



module.exports = IpsumItem;

