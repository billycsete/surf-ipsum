'use strict';

var $ = require('../../../lib/jquery/jquery');

var proto;

var UploaderMessage = function ( ) {
	this.$element = $('#uploader-message');
	this.isHidden = true;
};

proto = UploaderMessage.prototype;


proto.showMessage = function ( message ) {
	this.isHidden = false;
	console.log('show message');
};


proto.hideMessage = function () {
	if (this.isHidden) {
		return;
	}

	this.isHidden = true;
	console.log('hide message');
};


proto._setMessage = function () {

};


module.exports = UploaderMessage;
