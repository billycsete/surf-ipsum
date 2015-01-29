'use strict';

var $ = require('../../../lib/jquery/jquery');

var proto;

var UploaderMessage = function ( ) {
	this.$messageElement = $('#uploader-message');
};

proto = UploaderMessage.prototype;


proto.showMessage = function ( message ) {
	console.log('show message');
};


proto.hideMessage = function () {
	console.log('hide message');
};


proto.setMessage = function () {

};


module.exports = UploaderMessage;
