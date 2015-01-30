'use strict';

var $               = require('../../../lib/jquery/jquery');
var IpsumItem       = require('./IpsumItem');

var proto;



var IpsumList = function( listElement ) {
	// IpsumList elements
	this.$list = listElement;

	this.init();
};

proto = IpsumList.prototype;



proto.init = function() {
	console.log('new ipsum list');
};



proto.addListItem = function() {

};



module.exports = IpsumList;

