'use strict';

var Utils = {

	/**
	 * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
	 */
	hasParent : function( e, p ) {
		if ( !e ) return false;
		var el = e.target || e.srcElement || e || false;
		while ( el && el != p ) {
			el = el.parentNode || false;
		}
		return ( el!==false );
	},

	/**
	 * Random integer generator
	 * @param min {Number} - minimum value
	 * @param max {Number} - maximum value
	 */
	getRandomInt : function( min, max ) {
		return Math.floor( Math.random() * (max - min + 1) ) + min;
	}

};

module.exports.Utils = Utils;
