'use strict';

var TweenLite      = require('../../../node_modules/gsap/src/uncompressed/TweenLite.js');
var Trianglify     = require('../../../node_modules/trianglify/lib/trianglify.js');
var Modal          = require('../shared/Modal.js');
var SelectElement  = require('./SelectElement');
var IpsumOutput    = require('./IpsumOutput');
var IpsumItem      = require('./IpsumItem');

require('../../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js');
require('../shared/fixedSticky.js');


var Main = {

	/**
	 * Set up generator page
	 */
	initialize : function() {
		this.body                = document.body;
		this.$oceanWrapper       = $('#ocean-wrapper');
		this.$ocean              = $('#ocean');
		this.$inputElement       = $('#input-number');
		this.$generateButton     = $('#input-generate');
		this.$outputResults      = $('#output-results');
		this.$addButtons         = $('.output-button-add');
		this.$clearButton        = $('#clear-output');

		// build custom select element
		this.selectElement = new SelectElement();

		// instantiate Help Modal
		var modalTrigger = document.getElementById('help-button');
		var modal        = document.getElementById('help-modal');

		this.helpModal = new Modal( modalTrigger, modal );

		// create the ipsum output generator
		this.ipsumOutput = new IpsumOutput( this.$ipsumItemElement );

		// bound functions
		this._onKeypress          = this._onKeypress.bind(this);
		this._onResize            = this._onResize.bind(this);
		this._onOrientationChange = this._onOrientationChange.bind(this);
		this._generateIpsum       = this._generateIpsum.bind(this);
		this._clearIpsum          = this._clearIpsum.bind(this);
		this._onAddButtonClick    = this._onAddButtonClick.bind(this);
		this._printIpsumToOutput  = this._printIpsumToOutput.bind(this);

		// generate the low poly ocean texture svg
		this._generateBackgroundPattern();

		// attach events
		this._setupEvents();

		// add position sticky
		$('#output-controls').fixedsticky();

		// TODO: reset the scroll to the top of the page when it loads
		// this doesnt seem to work on Safari for some reason...
		this._clearIpsum();

	},



	/**
	 * Set up events
	 */
	_setupEvents : function() {
		// buttons of action
		this.$generateButton.on( 'click', this._generateIpsum );
		this.$clearButton.on( 'click', this._clearIpsum );

		for (var i = 0; i < this.$addButtons.length; i++) {
			$(this.$addButtons[i]).on( 'click', this._onAddButtonClick );
		}

		// handle keyboard events
		$(document).on( 'keydown', this._onKeypress );

		// prevent iOS from redrawing the ocean SVG as the bottom menu scrolls away
		if ( $('html').hasClass('touch') ) {
			$(window).on( 'orientationchange', this._onOrientationChange );
		} else {
			$(window).on( 'resize', this._onResize );
		}
	},



	/**
	 * Generate Background Pattern
	 */
	_generateBackgroundPattern : function() {
		var minOceanHeaderHeight = 380;
		var oceanBackgroundHeight = minOceanHeaderHeight;

		var newHeight = Math.floor( $(window).height() * 0.4 );

		if ( newHeight >= minOceanHeaderHeight ) {
			oceanBackgroundHeight = newHeight;
		}

		var oceanPattern = new Trianglify({
			height    : oceanBackgroundHeight,
			width     : window.innerWidth,
			variance  : 0.5,
			x_colors  : ['#081d58', '#253494', '#225ea8', '#1d91c0', '#41b6c4', '#7fcdbb'],
			cell_size : 40
		});

		// make sure the ocean background container is empty first
		this.$ocean.empty();
		// generate an ocean pattern and add it to the DOM
		this.$ocean.append( oceanPattern.svg() );
	},



	/**
	 * Handle page resize
	 */
	_onResize : function() {
		// generate a new background ocean pattern that matches the width on the new viewport size
		this._generateBackgroundPattern();
	},



	/**
	 * Handle orientation change
	 */
	_onOrientationChange : function() {
		// generate a new background ocean pattern that matches the width on the new viewport size
		this._generateBackgroundPattern();
	},



	/**
	 * Handle keypress events
	 * `Enter` should generate ipsum
	 * `Esc should clear ipsum
	 */
	_onKeypress : function( evt ) {
		// cross browser keycode
		var keycode = evt.keyCode ? evt.keyCode : evt.which;
		// If the 'Enter' key is pressed
		if( keycode === 13 ) {
			this._generateIpsum();
		}
		// If the 'Esc' key is pressed
		if( keycode === 27 ) {
			this._clearIpsum();
		}
	},


	/**
	 * Add button
	 */
	_onAddButtonClick : function( evt ) {
		var buttonElement = evt.currentTarget;

		var ipsumType = buttonElement.getAttribute('data-add');
		var animationDuration = 0.5;

		// create  a new ipsum item
		var ipsumItemElement = new IpsumItem( this.ipsumOutput, ipsumType );

		// animate scroll to top of output
		this._scrollToResults( animationDuration );


		$(ipsumItemElement).hide();
		this.$outputResults.prepend( ipsumItemElement );
		$(ipsumItemElement).delay(500).fadeIn(600);
	},



	/**
	 * Animate to the generated ipsum
	 */
	_generateIpsum : function() {
		var animationDuration = 1;

		// adds a body hook when the generate button is clicked
		// and before the scroll animation happens
		this.body.classList.add('will-show-results');

		// start building the ipsum before we start animating
		this._printIpsumToOutput();

		// scroll the window to the output
		TweenLite.to( window, animationDuration, {
			scrollTo: {
				y: $(window).height()
			},
			ease: Power4.easeInOut
		});

		// show the results after the scroll animation finishes
		window.setTimeout( function() {
			this.body.classList.add('show-results');
		}.bind(this), animationDuration * 1000);
	},



	/**
	 * Print the ipsum to the DOM and scroll down to the results
	 */
	_printIpsumToOutput : function() {
		// get the number value and type of ipsum from the inputs
		var inputValue = this.$inputElement.val();
		var selectValue = this.selectElement.getValue();

		for (var i = 0; i < inputValue; i++) {
			// create a new IpsumItem of the type from the select value
			var ipsumItemElement = new IpsumItem( this.ipsumOutput, selectValue );
			// prepend the generated IpsumItem element to the results
			this.$outputResults.prepend( ipsumItemElement );
		}
	},



	/**
	 * Clear the output and scroll back up to the top
	 */
	_clearIpsum : function() {
		var animationDuration = 1;

		// remove the body hook before we scroll back up to the top
		this.body.classList.remove('show-results');

		// scroll back to the top of the page
		this._scrollToTop( animationDuration );

		// clear the output after the scroll animation completes
		window.setTimeout( function() {
			this.body.classList.remove('will-show-results');
			this.$outputResults.empty();
		}.bind(this), animationDuration);
	},



	/**
	 * Scroll back to the top of the page
	 * @param {Number} scrollAnimationDuration - length in seconds of scroll animation
	 */
	_scrollToTop : function( scrollAnimationDuration ) {
		TweenLite.to( window, scrollAnimationDuration, {
			scrollTo: { y: 0 },
			ease: Power4.easeInOut
		});
	},



	/**
	 * Scroll to the top of the output results
	 * @param {Number} scrollAnimationDuration - length in seconds of scroll animation
	 */
	_scrollToResults : function( scrollAnimationDuration ) {
		// get the scrollY of the top of the output element
		var scrollToY = this.$oceanWrapper.offset().top + this.$oceanWrapper.height();

		TweenLite.to( window, scrollAnimationDuration, {
			scrollTo: {
				y: scrollToY
			},
			ease: Power4.easeInOut
		});
	}

};


Main.initialize();
