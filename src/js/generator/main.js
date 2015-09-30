'use strict';

var TweenLite      = require('../../../node_modules/gsap/src/uncompressed/TweenLite.js');
var ScrollToPlugin = require('../../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js');
var fixedSticky    = require('../shared/fixedSticky.js');
var Trianglify     = require('../../../node_modules/trianglify/lib/trianglify.js');
var SelectElement  = require('./SelectElement');
var IpsumOutput    = require('./IpsumOutput');


var Main = {

	/**
	 * Set up generator page
	 */
	initialize : function( ) {
		this.$body              = $(document.body);
		this.$oceanWrapper      = $('#ocean-wrapper');
		this.$ocean             = $('#ocean');
		this.$inputElement      = $('#input-number');
		this.$generateButton    = $('#input-generate');
		this.$outputResults     = $('#output-results');
		this.$addButton         = $('#output-button-add');
		this.$clearButton       = $('#output-button-clear');

		// Build custom select element
		this.selectElement = new SelectElement();

		// Create the ipsum output generator
		this.output = new IpsumOutput( this.$outputResults );

		// Bound functions
		this._onKeypress          = this._onKeypress.bind(this);
		this._onResize            = this._onResize.bind(this);
		this._onOrientationChange = this._onOrientationChange.bind(this);
		this._generateIpsum       = this._generateIpsum.bind(this);
		this._clearIpsum          = this._clearIpsum.bind(this);
		this._scrollToTop         = this._scrollToTop.bind(this);
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
	_setupEvents : function( ) {
		// buttons of action
		this.$generateButton.on( 'click', this._generateIpsum );
		this.$clearButton.on( 'click', this._clearIpsum );
		this.$addButton.on( 'click', this._scrollToTop );
		$(document).on( 'keydown', this._onKeypress );

		// prevents iOS from redrawing the ocean SVG as the bottom menu scrolls away
		if ( $('html').hasClass('touch') ) {
			$(window).on( 'orientationchange', this._onOrientationChange );
		} else {
			$(window).on( 'resize', this._onResize );
		}
	},



	/**
	 * Generate Background Pattern
	 */
	_generateBackgroundPattern : function( ) {
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
	_onResize : function( ) {
		// generate a new background ocean pattern that matches the width on the new viewport size
		this._generateBackgroundPattern();
	},



	/**
	 * Handle orientation change
	 */
	_onOrientationChange : function( ) {
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
		var keycode = (evt.keyCode ? evt.keyCode : evt.which);
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
	 * Animate to the generated ipsum
	 */
	_generateIpsum : function( ) {

		// adds a body hook when the generate button is clicked
		// and before the scroll animation happens
		this.$body.addClass('will-show-results');

		// start fetching the ipsum before we start animating
		this._printIpsumToOutput();

		TweenLite.to( window, 1, {
			scrollTo: {
				y: $(window).height()
			},
			ease: Power4.easeInOut,
			onComplete : this._afterIpsumGenerated.bind(this)
		});
	},



	/**
	 * Called after the results are shown
	 */
	_afterIpsumGenerated : function( ) {
		// add a body hook after the show results scroll animation finishes
		this.$body.addClass('show-results');
	},



	/**
	 * Print the ipsum to the DOM and scroll down to the results
	 */
	_printIpsumToOutput : function( ) {

		var inputValue = this.$inputElement.val();
		var selectValue = this.selectElement.getValue();

		switch ( selectValue ) {
			case 'paragraphs':

				// for (var i = 0; i < inputValue.length; i++) {
				// 	// new ipsumItemRefresher
				// 	this.output.generateParagraph();
				// };
				this.output.printParagraphsToOutputElement( inputValue );
				break;

			case 'headlines':
				this.output.printHeadlinesToOutputElement( inputValue );
				break;

			case 'lists':
				this.output.printListsToOutputElement( inputValue );
				break;

			case 'words':
				this.output.printWordsToOutputElement( inputValue );
				break;
		}
	},



	/**
	 * Clear the output and scroll back up to the top
	 * @param {Number} animationDuration - scroll to top animation time
	 */
	_clearIpsum : function( ) {
		// remove the body hook before we scroll back up to the top
		this.$body.removeClass('show-results');

		TweenLite.to( window, 1, {
			scrollTo: { y: 0 },
			ease: Power4.easeInOut,
			onComplete : this._afterIpsumCleared.bind(this)
		});
	},



	/**
	 * Called after the clear scroll animation is complete
	 */
	_afterIpsumCleared : function( ) {
		// remove the body hook after the clear scroll animation is complete
		this.$body.removeClass('will-show-results');
		this.$outputResults.empty();
	},



	/**
	 * Scroll back to the top of the page
	 */
	_scrollToTop : function( ) {
		TweenLite.to( window, 1, {
			scrollTo: { y: 0 },
			ease: Power4.easeInOut
		});
	}

};


Main.initialize();
