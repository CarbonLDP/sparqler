import * as hljs from "highlight.js/lib/highlight";

$( document ).ready( function() {
	// Start Highlight
	hljs.initHighlighting();
	$( ".member-code__hjs" ).each( function( i, block ) {
		hljs.highlightBlock( block );
	} );

	// Sidebar behaviour
	$( ".js-sidebar-toggler" ).click( function() {
		if( $( window ).width() <= 768 ) {
			$( ".main-container__menu" )
				.toggleClass( "in-mobile" )
				.addClass( "visible" )
			;
		} else {
			$( ".main-container__menu" )
				.toggleClass( "visible" )
				.addClass( "in-mobile" )
			;
		}
	} );
} );