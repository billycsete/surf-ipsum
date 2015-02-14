'use strict';

/**
 * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
 */
var hasParent = function( e, p ) {
	if ( !e ) return false;
	var el = e.target||e.srcElement||e||false;
	while ( el && el != p ) {
		el = el.parentNode||false;
	}
	return ( el!==false );
};

module.exports.hasParent = hasParent;
