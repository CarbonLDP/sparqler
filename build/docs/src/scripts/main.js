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
			$( ".docs-left-menu" )
				.toggleClass( "in-mobile" )
				.addClass( "docs-left-menu--visible" )
			;
		} else {
			$( ".docs-left-menu" )
				.toggleClass( "docs-left-menu--visible" )
				.addClass( "in-mobile" )
			;
		}
	} );
} );